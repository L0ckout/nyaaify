'using strict'

const { Plugin } = require('powercord/entities');
const { getModule, React } = require('powercord/webpack');
const { inject, uninject} = require('powercord/injector');

function nyaify(s){
        s = s.replace(/(.)([.?!~]?)(?:\n|$)/g,function(match,p1,p2,offset,string)
        {
                return `${p1}${p1==='.'||p1===','?'':','} nya${p2||'!'}\n`
        })
        return s
}

donya = false;

module.exports = class nyaifier extends Plugin {
	async startPlugin () {
	  powercord.api.commands.registerCommand({
		command: 'nyaauto',
		description: 'make your nya auto. Nya!',
		usage: '{c}',
		executor: (args) => {
			donya=!donya
			return {
		        send: false,
			result: `Your text will now${donya?'':' not'} be nyad. Nya!`
		}}
	});
	powercord.api.commands.registerCommand({
		command: 'nya',
		description: 'nyaify a text. Nya!',
		usage: '{c} [text to nya]',
		executor: (args)=>{
			let ret = args.join(' ')
			if(!donya)
			{
				ret = nyaify(ret)
			}
			return {
			send:true,
		        result:ret
		}}
	});
	
	const messageEvents = await getModule(["sendMessage"]);
    		inject("nyaifierSend", messageEvents, "sendMessage", function(args) {
	    	if(donya) {
        	let text = args[1].content;
        	text = nyaify(text);
        	args[1].content = text;      
	}      
	return args;  
    }, true);

  }
 
  pluginWillUnload () {
	powercord.api.commands.unregisterCommand('nyaauto');
	powercord.api.commands.unregisterCommand('nya');
  }
};

