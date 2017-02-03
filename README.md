# fkit

Based on basic code of WeChat bot of ReignDesign's [Building a WeChat (Weixin) robot](http://blog.reigndesign.com/blog/building-a-wechat-weixin-robot/).  
*fkit* or foreigner-kit is a wechat bot to help misc stuff for foreigners living in China. 

# Set Up

## Verification Request from WeChat

To make verification system works, you need to get token from dashboard and set it as environment variable on server that runs the bot. Do this to avoid hard-coding token into source code.

* Login to [WeChat Admin Page](https://mp.weixin.qq.com) then note `Token`.
* On server (production environment), or local system (development environment), execute `export FKIT_TOKEN=xxxx` in which `xxxx` is token you got from previous step.
* To make it effective every time, and every login session, add `export FKIT_TOKEN=xxxx` inside `~/.bash_profile` too.

# Start the Bot

Follow the following step to start the bot
* See section *Verfification Request from Wechat* to set up token to use with the bot
* Go to FKit's root directory via command line, then go to `./scripts` directory.
* Execute `start.sh` script via `./start.sh`. If there's any existing FKit (node) process running, it will kill it first.
* Interact with the bot via WeChat.

# Follow The Bot

Scan the following QR Code image to follow, and interact with the bot.  
If you're looking this page from within WeChat, then just hold down on the image until there's a context menu shows up that includes "Extract QR code", then select that option.

![fkit qr code](qrcode-fkit-wechat-bot.jpg)

# License
GNU GPL V.3.0. See [LICENSE](https://github.com/haxpor/fkit/blob/master/LICENSE).

