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

// Populate input fields from query parameters
function populateFieldsFromParams() {
    const params = getQueryParams();
    if (params.twitch) document.getElementById('twitch-username').value = params.twitch;
    if (params.discord) document.getElementById('discord-username').value = params.discord;
    if (params.twitter) document.getElementById('twitter-username').value = params.twitter;
    if (params.youtube) document.getElementById('youtube-username').value = params.youtube;
    if (params.instagram) document.getElementById('instagram-username').value = params.instagram;
    if (params.paypal) document.getElementById('paypal-username').value = params.paypal;
    if (params.onlyfans) document.getElementById('onlyfans-username').value = params.onlyfans;

    // Check if there are existing parameters to show gamer page
    if (params.twitch) {
        showGamerPage(params);
    }
}

// Function to show gamer page
function showGamerPage(params) {
    document.getElementById('gamer-page').classList.remove('hidden');
    document.querySelector('.input-section').classList.add('hidden');

    const iframe = document.getElementById('twitch-iframe');
    iframe.src = `https://player.twitch.tv/?channel=${params.twitch}&parent=gamertree.github.io`;

    document.getElementById('twitch-link').href = `https://www.twitch.tv/${params.twitch}`;
    document.getElementById('discord-link').href = `https://discord.com/invite/${params.discord}`;
    document.getElementById('twitter-link').href = `https://twitter.com/${params.twitter}`;
    document.getElementById('youtube-link').href = `https://youtube.com/c/${params.youtube}`;
    document.getElementById('instagram-link').href = `https://www.instagram.com/${params.instagram}`;
    document.getElementById('paypal-link').href = `https://www.paypal.me/${params.paypal}`;
    document.getElementById('onlyfans-link').href = `https://onlyfans.com/${params.onlyfans}`;
}

// Call the function to populate fields when the page loads
populateFieldsFromParams();

document.getElementById('generate-button').addEventListener('click', function() {
    const twitchUsername = document.getElementById('twitch-username').value.trim();
    const discordUsername = document.getElementById('discord-username').value.trim();
    const twitterUsername = document.getElementById('twitter-username').value.trim();
    const youtubeUsername = document.getElementById('youtube-username').value.trim();
    const instagramUsername = document.getElementById('instagram-username').value.trim();
    const paypalUsername = document.getElementById('paypal-username').value.trim();
    const onlyfansUsername = document.getElementById('onlyfans-username').value.trim();

    if (twitchUsername !== "") {
        // Show the gamer page
        showGamerPage({
            twitch: twitchUsername,
            discord: discordUsername,
            twitter: twitterUsername,
            youtube: youtubeUsername,
            instagram: instagramUsername,
            paypal: paypalUsername,
            onlyfans: onlyfansUsername
        });

        // Construct the share URL
        const shareUrl = `https://gamertree.github.io/?twitch=${twitchUsername}&discord=${discordUsername}&twitter=${twitterUsername}&youtube=${youtubeUsername}&instagram=${instagramUsername}&paypal=${paypalUsername}&onlyfans=${onlyfansUsername}`;

        // Automatically copy the share URL to the clipboard
        navigator.clipboard.writeText(shareUrl).then(() => {
            alert("Your personalized page URL has been copied to clipboard!");
            // Update the URL in the address bar without reloading the page
            window.history.pushState({}, '', shareUrl); // Update URL
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    }
});
