using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

public class ApiClient
{
    private readonly HttpClient _http = new();
    private readonly string _authBase;
    private readonly string _apiBase;

    public ApiClient(string authBase, string apiBase)
    {
        _authBase = authBase;
        _apiBase = apiBase;
    }

    private void EnsureAuthHeader()
    {
        var token = Session.Instance.JwtToken;
        _http.DefaultRequestHeaders.Authorization = null;

        if (!string.IsNullOrEmpty(token))
        {
            _http.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", token);
        }
    }

    public async Task<bool> LoginAsync(string username, string password)
    {
        var req = new { username, password };

        var resp = await _http.PostAsync(
            $"{_authBase}/api/Auth/login",
            new StringContent(JsonConvert.SerializeObject(req), Encoding.UTF8, "application/json")
        );

        if (!resp.IsSuccessStatusCode)
            return false;

        var json = await resp.Content.ReadAsStringAsync();
        var loginResp = JsonConvert.DeserializeObject<LoginResponse?>(json);

        if (loginResp?.Token != null)
        {
            Session.Instance.SetToken(loginResp.Token);
            return true;
        }

        return false;
    }

    public async Task<List<Quote>> GetQuotesAsync()
    {
        EnsureAuthHeader();
        var resp = await _http.GetAsync($"{_apiBase}/api/Quotes");
        resp.EnsureSuccessStatusCode();

        var json = await resp.Content.ReadAsStringAsync();
        return JsonConvert.DeserializeObject<List<Quote>>(json)
               ?? new List<Quote>();
    }

    public async Task<Quote?> PostQuoteAsync(Quote q)
    {
        EnsureAuthHeader();
        var content = new StringContent(JsonConvert.SerializeObject(q), Encoding.UTF8, "application/json");
        var resp = await _http.PostAsync($"{_apiBase}/api/Quotes", content);

        if (!resp.IsSuccessStatusCode)
            return null;

        var json = await resp.Content.ReadAsStringAsync();
        return JsonConvert.DeserializeObject<Quote>(json);
    }

    public async Task<bool> PutQuoteAsync(int id, Quote q)
    {
        EnsureAuthHeader();
        var content = new StringContent(JsonConvert.SerializeObject(q), Encoding.UTF8, "application/json");
        var resp = await _http.PutAsync($"{_apiBase}/api/Quotes/{id}", content);
        return resp.IsSuccessStatusCode;
    }

    public async Task<bool> DeleteQuoteAsync(int id)
    {
        EnsureAuthHeader();
        var resp = await _http.DeleteAsync($"{_apiBase}/api/Quotes/{id}");
        return resp.IsSuccessStatusCode;
    }
}