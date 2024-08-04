# Habrist

Habrist is an automated Telegram bot that delivers the latest articles from Habr
directly to your chat. Built with Deno, TypeScript, and Grammy.

## Features

- 🤖 Automated article delivery
- 🔄 Checks Habr's RSS feed every minute for new articles
- ⭐️ Simple setup: just start the bot to start receiving articles
- 📊 Uses Deno KV for efficient state management
- ⏱️ Leverages Deno cron for scheduled checks

## How It Works

1. Start a chat with the bot on Telegram
2. The bot will automatically send you new articles as they are published on
   Habr

## Technical Details

- Built with Deno and TypeScript
- Uses Grammy for Telegram bot functionality
- Implements Deno KV to store the ID of the last sent article
- Utilizes Deno cron for scheduling regular RSS feed checks

## Setup for Developers

1. Clone the repository:

```bash
git clone https://github.com/akumarujon/habrist.git
```

2. Install Deno if you haven't already:
   [Deno Installation](https://deno.land/#installation)

3. Set up your Telegram Bot Token as an environment variable:

```bash
export BOT_TOKEN=YOUR_BOT_TOKEN
export HOST=POLLING or WEBHOOK
```

4. Run the bot:

```bash
deno run --allow-net --allow-env --allow-read mod.ts
```

## Contributing

Contributions to habrist are welcome! Please feel free to submit pull requests,
create issues, or suggest new features.

## License

This project is not licensed yet.

## Acknowledgments

- Powered by Habr's RSS feed
- Built with Deno 🦕 for modern, efficient bot development
