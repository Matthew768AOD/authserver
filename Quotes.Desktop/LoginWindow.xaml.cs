using Quotes.Desktop;
using System.Windows;
using System.Windows.Controls;

namespace Quotes.Desktop
{
    public partial class LoginWindow : Window
    {
        private readonly ApiClient _api;

        public LoginWindow()
        {
            InitializeComponent();
            _api = new ApiClient("https://localhost:7023", "https://localhost:7136");
        }

        private async void LoginButton_Click(object sender, RoutedEventArgs e)
        {
            LoginButton.IsEnabled = false;

            var usernamame = UsernameBox.Text;
            var password = PasswordBox.Password;

            var ok = await _api.LoginAsync(usernamame, password);

            LoginButton.IsEnabled = true;

            if (!ok)
            {
                MessageBox.Show("Login failed", "Error",
                    MessageBoxButton.OK, MessageBoxImage.Error);
                return;
            }

            var main = new MainWindow(_api);
            main.Show();
            this.Close();
        }
    }
}