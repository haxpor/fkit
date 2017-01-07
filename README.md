# fkit

Based on basic code of WeChat bot of ReignDesign's [Building a WeChat (Weixin) robot](http://blog.reigndesign.com/blog/building-a-wechat-weixin-robot/).
*fkit* or foreigner-kit is a wechat bot to help misc stuff for foreigners living in China. 

# Set Up

## Verification Request from WeChat

To make verification system works, you need to get token from dashboard and set it as environment variable on server that runs the bot. Do this to avoid hard-coding token into source code.

* Login to [WeChat Admin Page](https://mp.weixin.qq.com) then note `Token`.
* On server system, execute `export FKIT_TOKEN=xxxx` in which `xxxx` is token you got from previous step.
* To make it effective every time, and every login session, add `export FKIT_TOKEN=xxxx` inside `~/.bash_profile` too.

# License
GNU GPL V.3.0. See [LICENSE](https://github.com/haxpor/fkit/blob/master/LICENSE).

