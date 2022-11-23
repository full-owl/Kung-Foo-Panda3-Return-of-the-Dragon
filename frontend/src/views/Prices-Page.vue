<template>

    <div>

        <h1>Item Prices</h1>

        <div class="navButtons">
            <router-link to="/manager">Inventory</router-link>
            <router-link to="/prices">Pricing</router-link>
            <router-link to="/menu-items">Menu Items</router-link>
        </div>

        <table class="table">
            <thead>
                <tr>
                <th scope="col">id</th>
                <th scope="col">foodtype</th>
                <th scope="col">name</th>
                <th scope="col">amountneeded</th>
                <th scope="col">price</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <th scope="row">1</th>
                <td>entree</td>
                <td>small</td>
                <td>1</td>
                <td>4.9</td>
                </tr>
                <tr>
                <th scope="row">2</th>
                <td>entree</td>
                <td>medium</td>
                <td>2</td>
                <td>8.9</td>
                </tr>
                <tr>
                <th scope="row">3</th>
                <td>entree</td>
                <td>large</td>
                <td>4</td>
                <td>10.4</td>
                </tr>
                <tr>
                <th scope="row">4</th>
                <td>premium entree</td>
                <td>small</td>
                <td>1</td>
                <td>6.15</td>
                </tr>
                <tr>
                <th scope="row">5</th>
                <td>premium entree</td>
                <td>medium</td>
                <td>2</td>
                <td>10.7</td>
                </tr>
                <tr>
                <th scope="row">6</th>
                <td>premium entree</td>
                <td>large</td>
                <td>4</td>
                <td>14.65</td>
                </tr>
                <tr>
                <th scope="row">7</th>
                <td>drink</td>
                <td>small</td>
                <td>16</td>
                <td>2.1</td>
                </tr>
                <tr>
                <th scope="row">8</th>
                <td>drink</td>
                <td>medium</td>
                <td>24</td>
                <td>2.3</td>
                </tr>
                <tr>
                <th scope="row">9</th>
                <td>drink</td>
                <td>large</td>
                <td>32</td>
                <td>2.5</td>
                </tr>
            </tbody>
        </table>

        <footer><router-link to="../">Main Menu</router-link></footer>

    </div>
    
</template>

<style scoped>
.navButtons {
    z-index: 1;
    position: sticky;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    background-color: red;
}
.navButtons a {
    display: inline-block;
    padding: 10px 30px;
    margin-left: 30px;
    margin-top: 15px;
    margin-bottom: 15px;
    border: 2px solid white;
    background-color: red;
    color: white;
    text-decoration: none;
    font-size: 10px;
}

.navButtons a:hover {
    color:red;
    background-color: white;
    border: 2px solid red;
    /* opacity: 0.3; */
}
</style>