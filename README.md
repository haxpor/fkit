# fkit

Based on basic code of WeChat bot of ReignDesign's [Building a WeChat (Weixin) robot](http://blog.reigndesign.com/blog/building-a-wechat-weixin-robot/).  
*fkit* or foreigner-kit is a wechat bot to help misc stuff for foreigners living in China. 

# Set Up

## Verification Request from WeChat

To make verification system works, you need to get token from dashboard and set it as environment variable on server that runs the bot. Do this to avoid hard-coding token into source code.

* Login to [WeChat Admin Page](https://mp.weixin.qq.com) then note `Token`.
* On server (production environment), or local system (development environment), execute `export FKIT_TOKEN=xxxx` in which `xxxx` is token you got from previous step.
* To make it effective every time, and every login session, add `export FKIT_TOKEN=xxxx` inside `~/.bash_profile` too.

## Set up Bot's URL

Internally bot will send full URL for users to access resource which required it to know beforehand.
Set this via environment variable again as follows.

* On server (production environment), or local system (development environment), execute `export FKIT_URL=xxxx` in which `xxxx` is something like `https://yourapi.domain.com/bot` (without slash `/` at the end). 
* To make it effective every time, and every login session. We do the same as in case of token in previous section. Add `export FKIT_URL=xxxx` inside `~/.bash_profile` too.

## Environment Variables

In summary, Fkit uses the following environment variables to make it operational

* `FKIT_TOKEN=xxxx` which is token you get from WeChat Admin Page's Token section
* `FKIT_URL=xxxx` which is url webhook setup i.e. `https://yourapi.domain.com/bot`
* `FKIT_APPID=xxxx` which is Baidu's fanyi (translation service) app id
* `FKIT_KEY=xxxx` which is Baidu's fanyi (translation service) key

Make sure you have this set up and they are known by your system before running the application.

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

[![Creative Commons License](https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-nc-sa/4.0/)  
This work is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://github.com/haxpor/fkit/blob/master/LICENSE).
