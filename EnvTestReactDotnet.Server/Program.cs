var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapGet("/api", () =>
{
    return new { Message = $"Yes, I am from dotnet, my Environment Variable for Name in dotnet is: {Environment.GetEnvironmentVariable("name") ?? "Not found"}"};
});

app.MapFallbackToFile("/index.html");

app.Run();
