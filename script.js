document.getElementById('generate-button').addEventListener('click', function() {
    const twitchUsername = document.getElementById('twitch-username').value.trim();
    const discordUsername = document.getElementById('discord-username').value.trim();
    const twitterUsername = document.getElementById('twitter-username').value.trim();
    const youtubeUsername = document.getElementById('youtube-username').value.trim();
    const instagramUsername = document.getElementById('instagram-username').value.trim();
    const paypalUsername = document.getElementById('paypal-username').value.trim();
    const onlyfansUsername = document.getElementById('onlyfans-username').value.trim();

    if (twitchUsername !== "") {
        // Show the gamer page section
        document.getElementById('gamer-page').classList.remove('hidden');
        
        // Hide the input section
        document.querySelector('.input-section').classList.add('hidden');

        // Update the Twitch iframe
        const iframe = document.getElementById('twitch-iframe');
        iframe.src = `https://player.twitch.tv/?channel=${twitchUsername}&parent=gamertree.github.io`;

        // Update the social media links
        document.getElementById('twitch-link').href = `https://www.twitch.tv/${twitchUsername}`;
        document.getElementById('discord-link').href = `https://discord.com/invite/${discordUsername}`;
        document.getElementById('twitter-link').href = `https://twitter.com/${twitterUsername}`;
        document.getElementById('youtube-link').href = `https://youtube.com/c/${youtubeUsername}`;
        document.getElementById('instagram-link').href = `https://www.instagram.com/${instagramUsername}`;
        document.getElementById('paypal-link').href = `https://www.paypal.me/${paypalUsername}`;
        document.getElementById('onlyfans-link').href = `https://onlyfans.com/${onlyfansUsername}`;

        // Show the share button
        document.getElementById('share-button').classList.remove('hidden');

        // Add pulse effect to buttons when they appear
        document.querySelectorAll('.link-button').forEach(button => {
            button.classList.add('pulse');
            setTimeout(() => button.classList.remove('pulse'), 500);
        });
    }
});

// Share button functionality
document.getElementById('share-button').addEventListener('click', function() {
    const twitchUsername = document.getElementById('twitch-username').value.trim();
    const discordUsername = document.getElementById('discord-username').value.trim();
    const twitterUsername = document.getElementById('twitter-username').value.trim();
    const youtubeUsername = document.getElementById('youtube-username').value.trim();
    const instagramUsername = document.getElementById('instagram-username').value.trim();
    const paypalUsername = document.getElementById('paypal-username').value.trim();
    const onlyfansUsername = document.getElementById('onlyfans-username').value.trim();

    const shareUrl = `https://gamertree.github.io/?twitch=${twitchUsername}&discord=${discordUsername}&twitter=${twitterUsername}&youtube=${youtubeUsername}&instagram=${instagramUsername}&paypal=${paypalUsername}&onlyfans=${onlyfansUsername}`;
    
    navigator.clipboard.writeText(shareUrl).then(() => {
        alert("Your personalized page URL has been copied to clipboard!");
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
});
