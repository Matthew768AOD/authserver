using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Windows;

public class ApiClient
{
    private readonly HttpClient _authHttp;
    private readonly HttpClient _apiHttp;

    public ApiClient(string authBase, string apiBase)
    {
        _authHttp = new HttpClient { BaseAddress = new Uri(authBase) };
        _apiHttp = new HttpClient { BaseAddress = new Uri(apiBase) };
    }

    private void EnsureAuthHeader()
    {
        var token = Session.Instance.JwtToken;

        _apiHttp.DefaultRequestHeaders.Authorization = null;

        if (!string.IsNullOrEmpty(token))
        {
            _apiHttp.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", token);
        }
    }

    public async Task<bool> LoginAsync(string username, string password)
    {
        var req = new { username, password };

        var resp = await _authHttp.PostAsync(
            "/api/Auth/login",
            new StringContent(
                JsonConvert.SerializeObject(req),
                Encoding.UTF8,
                "application/json")
        );

        var json = await resp.Content.ReadAsStringAsync();
        var loginResp = JsonConvert.DeserializeObject<LoginResponse?>(json);

        if (!resp.IsSuccessStatusCode)
            return false;
        if (loginResp?.Value != null)
        {
            Session.Instance.SetToken(loginResp.Value);
            return true;
        }

        var responseText = await resp.Content.ReadAsStringAsync();
        MessageBox.Show(responseText);

        return false;
    }

    public async Task<List<Quote>> GetQuotesAsync()
    {
        EnsureAuthHeader();
        var resp = await _apiHttp.GetAsync("/api/Quotes");
        resp.EnsureSuccessStatusCode();

        var json = await resp.Content.ReadAsStringAsync();
        return JsonConvert.DeserializeObject<List<Quote>>(json)
               ?? new List<Quote>();
    }

    public async Task<Quote?> PostQuoteAsync(Quote q)
    {
        EnsureAuthHeader();
        var content = new StringContent(JsonConvert.SerializeObject(q), Encoding.UTF8, "application/json");
        var resp = await _apiHttp.PostAsync($"/api/Quotes", content);

        if (!resp.IsSuccessStatusCode)
            return null;

        var json = await resp.Content.ReadAsStringAsync();
        return JsonConvert.DeserializeObject<Quote>(json);
    }

    public async Task<bool> PutQuoteAsync(int id, Quote q)
    {
        EnsureAuthHeader();
        var content = new StringContent(JsonConvert.SerializeObject(q), Encoding.UTF8, "application/json");
        var resp = await _apiHttp.PutAsync($"/api/Quotes/{id}", content);
        return resp.IsSuccessStatusCode;
    }

    public async Task<bool> DeleteQuoteAsync(int id)
    {
        EnsureAuthHeader();
        var resp = await _apiHttp.DeleteAsync($"/api/Quotes/{id}");
        return resp.IsSuccessStatusCode;
    }
}