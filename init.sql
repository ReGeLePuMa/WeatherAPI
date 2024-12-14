ALTER SYSTEM SET log_statement = 'all';
ALTER SYSTEM SET log_destination = 'stderr';
ALTER SYSTEM SET logging_collector = 'on';
ALTER SYSTEM SET log_filename = 'postgresql.log';
ALTER SYSTEM SET log_rotation_age = '1d';
ALTER SYSTEM SET log_rotation_size = '10MB';
ALTER SYSTEM SET log_error_verbosity = 'verbose';

SELECT pg_reload_conf();
