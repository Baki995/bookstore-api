#!/bin/bash
set -e

# Wait for PostgreSQL to be ready
until pg_isready -h "db" -p 5432 > /dev/null 2>&1; do
  echo "Waiting for PostgreSQL to be ready..."
  sleep 1
done

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "postgres" <<-EOSQL
    CREATE DATABASE "$DB_NAME";
    CREATE USER "$DB_USER" WITH PASSWORD '$DB_PASSWORD';
    ALTER ROLE "$DB_USER" SET client_encoding TO 'utf8';
    ALTER ROLE "$DB_USER" SET default_transaction_isolation TO 'read committed';
    ALTER ROLE "$DB_USER" SET timezone TO 'UTC';
    GRANT ALL PRIVILEGES ON DATABASE "$DB_NAME" TO "$DB_USER";
EOSQL
