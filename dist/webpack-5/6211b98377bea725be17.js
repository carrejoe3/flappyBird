var s_bird,s_bg,s_fg,s_pipeNorth,s_pipeSouth,s_text,s_score,s_splash,s_buttons,s_numberS,s_numberB;function Sprite(t,e,i,r,s){this.img=t,this.x=2*e,this.y=2*i,this.width=2*r,this.height=2*s}function initSprites(t){s_bird=[new Sprite(t,156,115,17,12),new Sprite(t,156,128,17,12),new Sprite(t,156,141,17,12)],(s_bg=new Sprite(t,0,0,138,114)).color="#70C5CF",s_fg=new Sprite(t,138,0,112,56),s_pipeNorth=new Sprite(t,251,0,26,200),s_pipeSouth=new Sprite(t,277,0,26,200),s_text={FlappyBird:new Sprite(t,59,114,96,22),GameOver:new Sprite(t,59,136,94,19),GetReady:new Sprite(t,59,155,87,22)},s_buttons={Rate:new Sprite(t,79,177,40,14),Menu:new Sprite(t,119,177,40,14),Share:new Sprite(t,159,177,40,14),Score:new Sprite(t,79,191,40,14),Ok:new Sprite(t,119,191,40,14),Start:new Sprite(t,159,191,40,14)},s_score=new Sprite(t,138,56,113,58),s_splash=new Sprite(t,0,114,59,49),s_numberS=new Sprite(t,0,177,6,7),s_numberB=new Sprite(t,0,188,7,10),s_numberS.draw=s_numberB.draw=function(e,i,r,s,h,n){s=s.toString();var p=this.width+2;h&&(i=h-(s.length*p-2)/2),n&&(i+=p*(n-s.length));for(var S=0,w=s.length;S<w;S++){var _=parseInt(s[S]);e.drawImage(t,p*_,this.y,this.width,this.height,i,r,this.width,this.height),i+=p}}}Sprite.prototype.draw=function(t,e,i){t.drawImage(this.img,this.x,this.y,this.width,this.height,e,i,this.width,this.height)};