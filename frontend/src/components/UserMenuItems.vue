<template>
    <div class="container-fluid" id="mainMenu">
        <div class ="row">
        <div class="col d-flex flex-column">

        <div class="viewportFull">

            <h1>Panda Menu</h1>
            <div class="headerBreak"></div>

            <div class="grid-container">
                <a href="#combo" class="card">
                    <img :src="require('./img/bigger-plate.png')" alt="Large Square plate viewed at an angle with brown rice in the back left corner, broccoli in the back right corner, broccoli beef in the front left corner, and string bean chicken breast in the front right corner."/>
                    <div class="card-text">
                        <h4><b>Meals</b></h4> 
                        <p>Choose a combo</p> 
                    </div>
                </a>
                <a href="#full-menu" class="card">
                    <img :src="require('./img/alacarte.png')" alt="Red takeout box with a Panda Express logo on the front, with the top open to show the original orange chicken." />
                    <div class="card-text">
                        <h4><b>A La Carte</b></h4> 
                        <p>Individual Items</p> 
                    </div>
                </a>
                <a href="#appetizer" class="card">
                    <img :src="require('./img/appetizer.png')" alt="Plate with two veggie rolls" />
                    <div class="card-text">
                        <h4><b>Appetizers</b></h4> 
                        <p>Extras</p> 
                    </div>
                </a>
                <a href="#drink" class="card">
                    <img :src="require('./img/drinks.png')" alt="An open top glass of coke-cola" />
                    <div class="card-text">
                        <h4><b>Drinks</b></h4> 
                        <p>Add a Refreshing Beverage</p> 
                    </div>
                </a>
            </div>
        </div>

        <div class="viewportFull" id="combo">
            <h1>Choose your combo</h1>
            <div class="headerBreak"></div>
            <div class="grid-container">
                <a href="#combo-item" class="card" v-for="item in bowls" :key="item.id" :disabled="isBowlDisabled" @click="addType(item)">
                    <img height="100" width:auto :src="addImg(item.id)" alt="" />
                    <div class="card-text">
                        <h4><b>{{ capitalize(item.name)}}</b></h4>
                        <p>description</p>
                    </div>
                </a>
            </div>
            <a href="#mainMenu">Return to main menu</a>
        </div>

        <div class="viewportFull" id="combo-item">
            <h1>Choose your side</h1>
            <div class="d-flex flex-wrap">
                <button 
                    v-for="item in sides" :key="item.id" :disabled="isSideDisabled"
                    type="button" class="btn btn-danger" @click="addItem(item)" alt="" >{{ item.name }}
                    <img height="50" width:auto :src="addImg(item.id)" alt="" />
                </button>
            </div>
            <h1>Choose your entree</h1>
            <div class="d-flex flex-wrap">
                <button 
                    v-for="item in entrees" :key="item.id" :disabled="isEntreeDisabled"
                    type="button" class="btn btn-danger" @click="addItem(item)">{{ item.name }}
                    <img height="50" width:auto :src="addImg(item.id)" alt="" />
                </button>
            </div>
            <div class="btn-group btn-group-lg container-fluid" role="group">
                <button type="button" class="btn btn-danger" @click="clearSelected"><a href="#top">Back to Main Menu</a></button>
                <button type="button" class="btn btn-danger" @click="clearSelected">Clear Selected</button>
                <button type="button" class="btn btn-danger" @click="addOrderToReciept"><a href="#top">Add to Order</a></button>
             </div>
        </div>

        <div class="viewportFull" id="appetizer">
            <h1>Choose you favorite extra item</h1>
            <div class="d-flex flex-wrap">
                <button 
                    v-for="item in appetizers" :key="item.id" :disabled="isAppDisabled"
                    type="button" class="btn btn-danger" @click="addItem(item)">{{ item.name }}
                    <img height="50" width:auto :src="addImg(item.id)" alt="" on/>
                </button>
            </div>
            <div class="btn-group btn-group-lg container-fluid" role="group">
                <button type="button" class="btn btn-danger" @click="clearSelected"><a href="#top">Back to Main Menu</a></button>
                <button type="button" class="btn btn-danger" @click="clearSelected">Clear Selected</button>
                <button type="button" class="btn btn-danger" @click="addOrderToReciept"><a href="#top">Add to Order</a></button>
             </div>
        </div>
      
        <div class="viewportFull" id="drink">
            <h1>Choose your drink</h1>
            <div class="d-flex flex-wrap">
                <button 
                    v-for="item in drinks" :key="item.id" :disabled="isDrinkDisabled"
                    type="button" class="btn btn-danger" @click="addItem(item)">{{ item.name }}
                    <img height="50" width:auto :src="addImg(item.id)" alt="" />
                </button>
            </div>
            <div class="btn-group btn-group-lg container-fluid" role="group">
                <button type="button" class="btn btn-danger" @click="clearSelected"><a href="#top">Back to Main Menu</a></button>
                <button type="button" class="btn btn-danger" @click="clearSelected">Clear Selected</button>
                <button type="button" class="btn btn-danger" @click="addOrderToReciept"><a href="#top">Add to Order</a></button>
             </div>
        </div>

             
            <choose-size ref="chooseSize" @addOrder="addAlLaCarteToReciept"/>
              </div>
              <RecieptTable class="col-sm-4" ref="recieptTable" :propOrderType="OrderType" :propOrderItems="OrderItems" :propOrderPrice="OrderPrice"/>
        </div>
    </div>
</template>
  
  <script>
  import RecieptTable from './RecieptTable.vue';
  import consts from '../consts.js';
  import ChooseSize from './ChooseSize.vue';
  export default {
      components: {
          ChooseSize,
          RecieptTable,
      },
      data() {
          return {
              bowls:[],
              sides:[],
              entrees: [],
              appetizers: [],
              drinks:[],
              OrderType : "",
              OrderItems: [],
              OrderPrice: 1,
              isBowlDisabled: false,
              isSideDisabled: false,
              isEntreeDisabled: false,
              isAppDisabled: false,
              isDrinkDisabled: false,
              sideCounter: 0,
              entreeCounter: 0,
              consts: consts,
          }
      },
      methods: {
            addImg(id){   
                // TODO: do actual placeholder imgs
                // If an item does not have an img, nothing loads
                // so new menu items with > 42 ids has m-undefined.png for their image
                if(id > 42) { 
                    return require('./img/m-undefined.png');
                }
                return require('./img/m-' + id + '.png');
            },
          async fetchItems(foodtype) {
          // connection from backend folder.. made need to change port if doing on web hosting
          
          // TODO: don't hardcode
          // const items = {
          //     entree: [{"id":7,"name":"The Original Orange Chicken","foodtype":"entree","description":"Not Available"},{"id":8,"name":"Grilled Teriyaki Chicken","foodtype":"entree","description":"Not Available"},{"id":9,"name":"Broccoli Beef","foodtype":"entree","description":"Not Available"},{"id":10,"name":"Kung Pao Chicken","foodtype":"entree","description":"Not Available"},{"id":11,"name":"Honey Sesame Chicken Breast","foodtype":"entree","description":"Not Available"},{"id":12,"name":"Beijing Beef","foodtype":"entree","description":"Not Available"},{"id":13,"name":"Mushroom Chicken","foodtype":"entree","description":"Not Available"},{"id":14,"name":"SweetFire Chicken Breast","foodtype":"entree","description":"Not Available"},{"id":15,"name":"String Bean Chicken Breast","foodtype":"entree","description":"Not Available"},{"id":16,"name":"Black Pepper Chicken","foodtype":"entree","description":"Not Available"},{"id":17,"name":"Super Greens","foodtype":"entree","description":"Not Available"},{"id":50,"name":"Seasonal Item","foodtype":"entree","description":"your mom"},{"id":1003,"name":"pumkin spice chicken","foodtype":"entree","description":"seasonal"}],
          //     appetizer: [{"id":21,"name":"Chicken Egg Roll","foodtype":"appetizer","description":"Not Available"},{"id":22,"name":"Veggie Spring Roll","foodtype":"appetizer","description":"Not Available"},{"id":23,"name":"Cream Cheese Rangoon","foodtype":"appetizer","description":"Not Available"}],
          //     drink: [{"id":24,"name":"Dr Pepper","foodtype":"drink","description":"Not Available"},{"id":25,"name":"Coca Cola","foodtype":"drink","description":"Not Available"},{"id":26,"name":"Diet Coke","foodtype":"drink","description":"Not Available"},{"id":27,"name":"Barq's Root Beer","foodtype":"drink","description":"Not Available"},{"id":28,"name":"Fanta Orange","foodtype":"drink","description":"Not Available"},{"id":29,"name":"Minute Maid Lemonade","foodtype":"drink","description":"Not Available"},{"id":30,"name":"Powerade Mountain Berry Blast","foodtype":"drink","description":"Not Available"},{"id":31,"name":"Sprite","foodtype":"drink","description":"Not Available"},{"id":32,"name":"Fuze Raspberry Iced Tea","foodtype":"drink","description":"Not Available"},{"id":33,"name":"Passion Mango Black Tea","foodtype":"drink","description":"Not Available"},{"id":34,"name":"Sweet Tea","foodtype":"drink","description":"Not Available"},{"id":35,"name":"Powerade Fruit Punch","foodtype":"drink","description":"Not Available"},{"id":36,"name":"Dasani","foodtype":"drink","description":"Not Available"},{"id":37,"name":"Minute Maid Apple Juice","foodtype":"drink","description":"Not Available"},{"id":38,"name":"Coca Cola","foodtype":"drink","description":"Not Available"},{"id":39,"name":"Coke Mexico","foodtype":"drink","description":"Not Available"},{"id":40,"name":"Coke Zero","foodtype":"drink","description":"Not Available"},{"id":41,"name":"Bai Coco Fusion","foodtype":"drink","description":"Not Available"},{"id":42,"name":"Sanzo Lychee Sparkling Water","foodtype":"drink","description":"Not Available"},{"id":100,"name":"tesr","foodtype":"drink","description":"drink"}],
          //     side: [{"id":1,"name":"Chow Mein","foodtype":"side","description":"Not Available"},{"id":2,"name":"Chow Fun","foodtype":"side","description":"Not Available"},{"id":3,"name":"Fried Rice","foodtype":"side","description":"Not Available"},{"id":4,"name":"Brown Steamed Rice","foodtype":"side","description":"Not Available"},{"id":5,"name":"White Steamed Rice","foodtype":"side","description":"Not Available"},{"id":6,"name":"Super Greens","foodtype":"side","description":"Not Available"}],
          // }
          const res = await fetch(`${consts.backend_url}/items/${foodtype}`);
          const data = await res.json();
          //const data = items[foodtype];
          return data;
          },
          
          async fetchCombos() {
          const res = await fetch(`${consts.backend_url}/combosizes`);
          const data = await res.json();
          // TODO: don't hardcode
              // const data = [{"foodtype":"combo","name":"bowl","amountneeded":0,"price":7.50},
              // {"foodtype":"combo","name":"plate","amountneeded":0,"price":9.00},
              // {"foodtype":"combo","name":"bigger plate","amountneeded":0,"price":10.50},
              // {"foodtype":"combo","name":"family","amountneeded":0,"price":32.00}];
          return data;
          },
          addType(type) {
              if (this.OrderType == type) {
                  this.OrderType = "";
              } else {
                  this.OrderType = type;
              }
              this.isBowlDisabled = true;
              this.isAppDisabled = true;
              this.isDrinkDisabled = true;
              this.isEntreeDisabled = true;
        },
        addItem(item) {
            console.log("sadfasfs");
            if(item.foodtype == "side") {
                if(this.OrderType == "") { // Type not selected
                    this.$refs.chooseSize.show(item);
                    return;
                }
                this.OrderItems.push(item);
                this.sideCounter += 1;
                if(consts.numInCombo[this.OrderType.name].side == this.sideCounter ) {
                    this.isSideDisabled = true;
                    this.isEntreeDisabled = false;
                }
            } else if(item.foodtype == "entree") {
                if(this.OrderType == "") { // Type not selected
                    this.$refs.chooseSize.show(item);
                    return;
                }
                this.OrderItems.push(item);
                this.entreeCounter += 1;
                if(consts.numInCombo[this.OrderType.name].entree == this.entreeCounter) {
                    this.isEntreeDisabled = true;
                    this.isSideDisabled = true;
                }
            } else if(item.foodtype == "appetizer") {
                this.$refs.chooseSize.show(item);
                return;
            } else if(item.foodtype == "drink") {
                this.$refs.chooseSize.show(item);
                return;
            }
        },
          // TODO: can this be done better than adding an additional fxn
        addAlLaCarteToReciept(type, item) {
            this.$refs.recieptTable.addToOrder(type, item);
        },
        addOrderToReciept() {
            this.$refs.recieptTable.addToOrder(this.OrderType, this.OrderItems);
            this.clearSelected();
        },
        clearSelected() {
            this.OrderType = "";
            this.OrderItems = [];
            this.OrderPrice = 0;
            this.isBowlDisabled = false;
            this.isEntreeDisabled = false;
            this.isSideDisabled = false;
            this.isAppDisabled = false;
            this.isDrinkDisabled = false;
            this.sideCounter = 0;
            this.entreeCounter = 0;
        },
        capitalize(x) { // why is this not in standard lib???
            return x.charAt(0).toUpperCase() + x.slice(1);
        }
    },
    async created() {
        this.entrees = await this.fetchItems("entree");
        this.appetizers = await this.fetchItems("appetizer");
        this.drinks = await this.fetchItems("drink");
        this.sides = await this.fetchItems("side");
        this.bowls = await this.fetchCombos();
        }
}
</script>
  
<style scoped>
.viewportFull{
    height:100vh;
}
.grid-container{
  display: grid;
  grid-template-columns: auto auto;
  padding: 25px;
  margin: 15;
}

.card img{
  width: 60%;
}
.card {
  background-color:#B30000;
  color:white;
  width: 300px;
  height: 200px;
  margin:20px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
}

a {
  color:aliceblue;
  text-decoration: none;
}

.card:hover {
  background-color:white;
  border-color: #B30000;
  border-width: 2.5px;
  color:#B30000;
  margin: 30px;
  width:310px;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

.card-text {
  padding: 2px 16px;
}
.headerBreak {
  background-color: #B30000;
  width: 100%;
  height: 36px;
}    
.btn {
    width: 20%;
    border-radius: 0%;
    border-color: aliceblue;
    color: aliceblue;
}
</style>