using System;

using System.Collections.ObjectModel;

using System.Net.Http;

using System.Threading.Tasks;

using System.Windows;

namespace Quotes.Desktop

{

    public partial class MainWindow : Window

    {

        private readonly ApiClient _api;

        public ObservableCollection<Quote> Quotes { get; } = new();

        public MainWindow(ApiClient api)

        {

            InitializeComponent();

            _api = api;

            QuotesGrid.ItemsSource = Quotes;

            DeleteBtn.IsEnabled = Session.Instance.IsAdmin;

            Loaded += MainWindow_Loaded;

        }

        private async void MainWindow_Loaded(object sender, RoutedEventArgs e)

        {

            await LoadQuotes();

        }

        private async Task LoadQuotes()

        {

            try

            {

                var list = await _api.GetQuotesAsync();

                Quotes.Clear();

                foreach (var q in list)

                    Quotes.Add(q);

            }

            catch (Exception ex)

            {

                if (ex is HttpRequestException httpEx && httpEx.Data["response"] is string body)

                {

                    MessageBox.Show($"Server response:\n{body}");

                }

                MessageBox.Show($"Chyba při načítání: {ex.Message}");

            }

        }

        private void AddBtn_Click(object sender, RoutedEventArgs e)

        {

            var input = Microsoft.VisualBasic.Interaction.InputBox("Text:", "Add quote", "");

            if (string.IsNullOrWhiteSpace(input))

                return;

            var q = new Quote { Text = input };

            _ = AddQuoteAsync(q);

        }

        private async Task AddQuoteAsync(Quote q)

        {

            var created = await _api.PostQuoteAsync(q);

            if (created != null)

                Quotes.Add(created);

        }

        private void EditBtn_Click(object sender, RoutedEventArgs e)

        {

            if (QuotesGrid.SelectedItem is not Quote sel)

                return;

            var newText = Microsoft.VisualBasic.Interaction.InputBox("Edit text:", "Edit quote", sel.Text);

            if (string.IsNullOrWhiteSpace(newText))

                return;

            sel.Text = newText;

            _ = _api.PutQuoteAsync(sel.Id, sel);

            QuotesGrid.Items.Refresh();

        }

        private async void DeleteBtn_Click(object sender, RoutedEventArgs e)

        {

            if (QuotesGrid.SelectedItem is not Quote sel)

                return;

            if (!Session.Instance.IsAdmin)

            {

                MessageBox.Show("Nemáte oprávnění smazat citaci.");

                return;

            }

            var ok = MessageBox.Show("Delete selected?", "Confirm",

                MessageBoxButton.YesNo) == MessageBoxResult.Yes;

            if (!ok)

                return;

            var success = await _api.DeleteQuoteAsync(sel.Id);

            if (success)

                Quotes.Remove(sel);

            else

                MessageBox.Show("Delete failed");

        }

    }

}
