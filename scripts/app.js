new Vue({
	el:'#app',
	data:{
		playerHealth: 100,
		monsterHealth: 100,
		gameIsRunning: false,
        turns:[],
        count:0,
        buttonState:false
    },
	methods: {
        startGame: function () {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
            this.count = 0;
        },
        attack: function () {
            var damage = this.calculateDamage(15, 3);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer:true,
                text:'玩家对怪兽造成' + damage + '点伤害'
            });
            this.monsterAttacks();

            if (this.checkWin()) {
                return;
            }
            this.checkWin();
        },
        specialAttack: function () {
            var damage = this.calculateDamage(30,10);
            this.count++;
            if(this.count>2){
                this.turns.unshift({
                    isPlayer:false,
                    text:'技能次数已用完'
                });
                return;
            };
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer:true,
                text: '玩家对怪兽造成' + damage + '点重伤'
            });
            this.monsterAttacks();
            if (this.checkWin()) {
                return;
            };


        },
        heal: function () {
            if(this.playerHealth <= 90){
                this.playerHealth += 10;
            } else{
                this.playerHealth = 100;
            }
            this.turns.unshift({
                isPlayer:true,
                text:'玩家获得10点生命治疗'
            });
            this.monsterAttacks();
            if (this.checkWin()){
                return;
            };
        },
        giveUp: function () {
            this.gameIsRunning = false;

        },
        monsterAttacks:function(){
            var damage = this.calculateDamage(20, 5);
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer: false,
                text:'怪兽对玩家造成' + damage + '点伤害'
            });

        },
        calculateDamage: function (max, min) {
            return Math.max(Math.floor(Math.random()*max) + 1, min);
        },
        checkWin: function () {
            if (this.monsterHealth <= 0) {
                this.monsterHealth = 0;
                if (confirm('You Win! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                this.playerHealth = 0;
                if (confirm('You Lost! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }

    },
    computed: {

        }


});
