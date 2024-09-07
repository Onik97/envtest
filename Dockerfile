# Stage 1: Build frontend
FROM node:20.11.0 AS frontend-build

WORKDIR /app
COPY . .

WORKDIR /app/envtestreactdotnet.client
ENV VITE_NAME=$VITE_NAME
RUN env
RUN npm install --loglevel verbose
RUN npm run build

# Stage 2: Build backend
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS backend-build
EXPOSE 8080

WORKDIR /app
COPY --from=frontend-build /app /app

WORKDIR /app/EnvTestReactDotnet.Server
RUN dotnet publish ./EnvTestReactDotnet.Server.csproj -c Release -o ./publish /p:UseAppHost=false

# Stage 3: Final runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 as runtime-build
WORKDIR /app
COPY --from=backend-build /app/EnvTestReactDotnet.Server/publish .
ENTRYPOINT ["dotnet", "EnvTestReactDotnet.Server.dll"]
