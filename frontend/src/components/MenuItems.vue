<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col d-flex flex-column">
                <div>
                    <h2>Type</h2>

                    <div class="d-flex flex-wrap">
                        <button v-for="item in bowls" :key="item.id" :disabled="isBowlDisabled"
                        type="button" class="btn btn-primary" @click="addType(item)">{{ capitalize(item.name) }}
                        <p>Price: ${{(item.price)}}</p></button>
                    </div>
                </div>
                <div>
                    <h2>Side</h2>
                    <div class="d-flex flex-wrap">
                        <button v-for="item in sides" :key="item.id" :disabled="isSideDisabled"
                        type="button" class="btn btn-primary" @click="addItem(item)">{{ item.name }}</button>
                        
                    </div>

                </div>
                <div>
                    <h2>Entree</h2>

                    <div class="d-flex flex-wrap">
                        <button v-for="item in entrees" :key="item.id" :disabled="isEntreeDisabled"
                        type="button" class="btn btn-primary" @click="addItem(item)">{{ item.name }}</button>
                    </div>
                </div>
                <div>
                    <h2>Appetizer</h2>
                    <div class="d-flex flex-wrap">
                        <button v-for="item in appetizers" :key="item.id" :disabled="isAppDisabled"
                        type="button" class="btn btn-primary" @click="addItem(item)">{{ item.name }}</button>
                    </div>
                </div>
                <div>
                    <h2>Drinks</h2>
                    <div class="d-flex flex-wrap">
                        <button v-for="item in drinks" :key="item.id" :disabled="isDrinkDisabled"
                        type="button" class="btn btn-primary" @click="addItem(item)">{{ item.name }}</button>
                    </div>
                </div>
                <div class>
                      <!-- TODO: make selections look better/more intuative -->
                      <p>{{OrderType.name}}</p>
                      <!-- <p>{{ consts.numInCombo[OrderType.name]}}</p> -->
                      <ul>
                          <li v-for="part in OrderItems" :key="part">
                              {{part.name}}
                          </li>
                      </ul>
                  </div>
                  <div class="btn-group btn-group-lg container-fluid" role="group">
                      <button type="button" class="btn btn-primary" @click="clearSelected">Clear Selected</button>
                      <button type="button" class="btn btn-primary" @click="addOrderToReciept" :disabled="this.OrderItems.length === 0">Add to Order</button>
                  </div>
                  <choose-size ref="chooseSize" @addOrder="addAlLaCarteToReciept"/>
              </div>
              <RecieptTable class="col-sm" ref="recieptTable" :propOrderType="OrderType" :propOrderItems="OrderItems" :propOrderPrice="OrderPrice"/>
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
    .btn {
        width: 20%;
        border-radius: 0%;
        border-color: aliceblue;
        color: aliceblue;
        font-weight: bold;
    }
</style>