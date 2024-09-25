// Function to get query parameters
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        twitch: params.get('twitch'),
        discord: params.get('discord'),
        twitter: params.get('twitter'),
        youtube: params.get('youtube'),
        instagram: params.get('instagram'),
        paypal: params.get('paypal'),
        onlyfans: params.get('onlyfans')
    };
}

// Function to show the gamer page
function showGamerPage(params) {
    document.getElementById('gamer-page').classList.remove('hidden');
    document.querySelector('.input-section').classList.add('hidden');

    const iframe = document.getElementById('twitch-iframe');
    iframe.src = `https://player.twitch.tv/?channel=${params.twitch}&parent=gamertree.github.io`;

    document.getElementById('twitch-link').href = `https://www.twitch.tv/${params.twitch}`;
    document.getElementById('discord-link').href = `https://discord.com/invite/${params.discord}`;
    document.getElementById('twitter-link').href = `https://twitter.com/${params.twitter}`;
    document.getElementById('youtube-link').href = `https://youtube.com/@${params.youtube}`;
    document.getElementById('instagram-link').href = `https://www.instagram.com/${params.instagram}`;
    document.getElementById('paypal-link').href = `https://www.paypal.me/${params.paypal}`;
    document.getElementById('onlyfans-link').href = `https://onlyfans.com/${params.onlyfans}`;
}

// Populate input fields from query parameters and show gamer page if applicable
function populateFieldsFromParams() {
    const params = getQueryParams();
    if (params.twitch) {
        // Pre-fill the input fields
        document.getElementById('twitch-username').value = params.twitch;
        document.getElementById('discord-username').value = params.discord || '';
        document.getElementById('twitter-username').value = params.twitter || '';
        document.getElementById('youtube-username').value = params.youtube || '';
        document.getElementById('instagram-username').value = params.instagram || '';
        document.getElementById('paypal-username').value = params.paypal || '';
        document.getElementById('onlyfans-username').value = params.onlyfans || '';
        
        // Show the gamer page
        showGamerPage(params);
    }
}

// Call the function to populate fields when the page loads
populateFieldsFromParams();

// Function to shorten URL using TinyURL API
async function shortenURL(longUrl) {
    const apiUrl = `https://api.tinyurl.com/create?url=${encodeURIComponent(longUrl)}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Include your TinyURL API key here if required, else it can be left out
                // 'Authorization': 'Bearer YOUR_API_KEY'
            },
            body: JSON.stringify({url: longUrl})
        });
        
        if (!response.ok) {
            throw new Error('Failed to shorten the URL');
        }

        const data = await response.json();
        return data.shortUrl; // Return the shortened URL from TinyURL
    } catch (error) {
        console.error('Error shortening URL:', error);
        return null;
    }
}

// Generate the page and handle sharing
document.getElementById('generate-button').addEventListener('click', async function() {
    const twitchUsername = document.getElementById('twitch-username').value.trim();
    const discordUsername = document.getElementById('discord-username').value.trim();
    const twitterUsername = document.getElementById('twitter-username').value.trim();
    const youtubeUsername = document.getElementById('youtube-username').value.trim();
    const instagramUsername = document.getElementById('instagram-username').value.trim();
    const paypalUsername = document.getElementById('paypal-username').value.trim();
    const onlyfansUsername = document.getElementById('onlyfans-username').value.trim();

    if (twitchUsername !== "") {
        // Prepare the params for the gamer page
        const params = {
            twitch: twitchUsername,
            discord: discordUsername,
            twitter: twitterUsername,
            youtube: youtubeUsername,
            instagram: instagramUsername,
            paypal: paypalUsername,
            onlyfans: onlyfansUsername
        };

        // Show the gamer page
        showGamerPage(params);

        // Construct the long share URL
        const longUrl = `https://gamertree.github.io/?twitch=${twitchUsername}&discord=${discordUsername}&twitter=${twitterUsername}&youtube=${youtubeUsername}&instagram=${instagramUsername}&paypal=${paypalUsername}&onlyfans=${onlyfansUsername}`;

        // Shorten the long URL using TinyURL
        const shortUrl = await shortenURL(longUrl);

        if (shortUrl) {
            // Automatically copy the shortened URL to the clipboard
            navigator.clipboard.writeText(shortUrl).then(() => {
                alert("Your personalized page URL has been copied to clipboard: " + shortUrl);
                // Update the URL in the address bar without reloading the page
                window.history.pushState({}, '', shortUrl); // Update URL with short link
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        } else {
            console.error("Failed to shorten the URL.");
        }
    }
});
