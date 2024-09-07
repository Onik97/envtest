1. run 'docker build . -t envTest'
2. run 'docker run -e "name=backend" -e "VITE_NAME=frontend" -e "NPM_CONFIG_LOGLEVEL=verbose" -p 8080:8080 envTest'

# Why is it that .Net ENV is found, but Vite ENV doesnt?
