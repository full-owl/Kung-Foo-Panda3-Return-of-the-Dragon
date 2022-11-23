<template>

    <div>

        <h1>Inventory</h1>

        <div class="navButtons">
            <router-link to="/manager">Inventory</router-link>
            <router-link to="/prices">Pricing</router-link>
            <router-link to="/menu-items">Menu Items</router-link>
        </div>

        <table class="table">
            <thead>
                <tr>
                <th scope="col">id</th>
                <th scope="col">ingredient</th>
                <th scope="col">currentamount</th>
                <th scope="col">unit</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <th scope="row">1</th>
                <td>rice</td>
                <td>72</td>
                <td>oz</td>
                </tr>
                <tr>
                <th scope="row">2</th>
                <td>brown rice</td>
                <td>72</td>
                <td>oz</td>
                </tr>
                <tr>
                <th scope="row">3</th>
                <td>vegetables</td>
                <td>95</td>
                <td>oz</td>
                </tr>
                <tr>
                <th scope="row">4</th>
                <td>vegetables</td>
                <td>95</td>
                <td>oz</td>
                </tr>
                <tr>
                <th scope="row">5</th>
                <td>broccoli</td>
                <td>94</td>
                <td>oz</td>
                </tr>
                <tr>
                <th scope="row">6</th>
                <td>chicken</td>
                <td>45</td>
                <td>oz</td>
                </tr>
                <tr>
                <th scope="row">7</th>
                <td>orange sauce</td>
                <td>96</td>
                <td>oz</td>
                </tr>
                <tr>
                <th scope="row">8</th>
                <td>steak</td>
                <td>100</td>
                <td>oz</td>
                </tr>
                <tr>
                <th scope="row">9</th>
                <td>black pepper sauce</td>
                <td>100</td>
                <td>oz</td>
                </tr>
                <tr>
                <th scope="row">10</th>
                <td>shrimp</td>
                <td>100</td>
                <td>oz</td>
                </tr>
                <tr>
                <th scope="row">11</th>
                <td>walnut</td>
                <td>100</td>
                <td>oz</td>
                </tr>
                <tr>
                <th scope="row">12</th>
                <td>honey walnut shrimp sauce</td>
                <td>100</td>
                <td>oz</td>
                </tr>
                <tr>
                <th scope="row">13</th>
                <td>black pepper sauce</td>
                <td>100</td>
                <td>oz</td>
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


