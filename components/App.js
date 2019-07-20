App = React.createClass({

    //var GIPHY_API_URL = 'https://api.giphy.com',


    getInitialState() {
        return {
            loading: false,
            searchingText: '',
            gif: {}
        };
    },

    handleSearch: function (searchingText) {  // 1.
        this.setState({
            loading: true  // 2.
        });
        this.getGif(searchingText)   // 3.
            .then(gif => {
                this.setState({  // 4
                    loading: false,  // a
                    gif: gif,  // b
                    searchingText: searchingText  // c
                });
            })
            .catch(error => {
                console.log("Nie można załadować gifa")
            });

    },


    getGif: function (searchingText) {  // 1.
        return new Promise(function (resolve, reject) {

            var GIPHY_API_URL = 'https://api.giphy.com';
            var GIPHY_PUB_KEY = 'CP9CSwsmOuZ0IMUul9Rzs1uyy4mud1dz';
            var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;  // 2.
            var xhr = new XMLHttpRequest();  // 3.

            xhr.onload = function () {

                var data = JSON.parse(xhr.responseText).data; // 4.
                var gif = {  // 5.
                    url: data.fixed_width_downsampled_url,
                    sourceUrl: data.url
                };
                if (xhr.status === 200) {
                    resolve(gif);
                }
                else {
                    reject(error);
                }
            }
            xhr.open('GET', url);
            xhr.send();
        });

    },


    render: function () {

        var styles = {
            margin: '0 auto',
            textAlign: 'center',
            width: '90%'
        };

        return (
            <div style={styles}>
                <h1>Wyszukiwarka GIFow!</h1>
                <p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Naciskaj enter, aby pobrać kolejne gify.</p>
                <Search
                    onSearch={this.handleSearch}
                />
                <Gif
                    loading={this.state.loading}
                    url={this.state.gif.url}
                    sourceUrl={this.state.gif.sourceUrl}
                />
                <img src={'giphy.png'} />
            </div>
        );
    }
});