#!/bin/sh
until pg_isready -h db -p 5432 -U postgres; do
  echo "Waiting for database..."
  sleep 1
done

echo "Applying migrations..."
npx prisma migrate deploy --schema=./prisma/schema.prisma || { echo "Migration failed"; exit 1; }
echo "Starting application..."
npm run start
