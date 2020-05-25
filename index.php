<?php
include 'header.php';
?>
<h1 class="text-center bg-primary jumbotron text-white">Holiday Generator</h1>

<div class="container">
    <div class="mainGenWrapper">
        <div class="generator card [ py-3 ]">
            <h3 class="text-center">Generate your next holiday!</h3>

            <div class="innerGenerator">
                <div class="RandomBtnWrapper text-center">
                    <button class=" btn btn-success randomBtn w-75" id="randomBtn">Randomise Location!</button>

                </div>

                <div class="locationWrapper">
                    <div id="randomLocation">


                    </div>
                    <div id="locationMap">

                    </div>
                    <h3 class="text-center bg-primary py-2 text-white m-0">Get Hotel Prices</h3>
                    <div class="hotelsBtns mt-4 d-flex align-items-center">


                        <select class="form-control" name="priceRange" id="">
                            <option selected disabled">Price Range</option>


                            <option value="1000">£1000+</option>
                            <option value="800">£800</option>
                            <option value="400">£400</option>
                            <option value="200">£200</option>

                        </select>
                        <input type="date" name="date" id="date" class="form-control">
                        <button class="hotelPrices btn btn-success">Get Hotel Prices</button>

                    </div>
                    <div class="hotelInfoWrapper" id="hotelInfoWrapper">
                        <ul class="list-group hotelInfo " id="hotelInfo">


                        </ul>
                    </div>
                    <div class="hotelMap" id="hotelMap">

                    </div>


                </div>

            </div>


        </div>


    </div>

</div>


<?php
include 'footer.php';

?>