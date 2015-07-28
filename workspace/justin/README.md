####This Readme file was created using the [gh-pages DEMO](http://juliusakula.github.io/editor/#/) of [my markdown editor - star it on github](https://github.com/juliusakula/editor/) and use it.

* goals of engine.js is to provide a map api to render terrain, prevent walking into things. basic ascii-rendering map.
* creating HUD template such as bag or dialog or pause screen - make a documentated part of the api

* asciiRPG.js --> engine.js 
* sample_world.js is excellent, could perhaps split into poke_engine.js and bag functionality moved to engine.js, or when specific javascript is needed name it world.js so the we don't commit to engine.js as much and risk mixing our implementation of the engine with the engine itself.
  * an example is the HUD/menu. The menu itself should be functional as part of the engine, but the items in the menu e.g. pokedex, pokemon would be part of the sample_world.js or a seperate poke_engine.js file. 