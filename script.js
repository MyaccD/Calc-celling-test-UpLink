$(function(){
    
    function ResultCalculator(){
        
        result = 0;
        
        calk_1 = $(".calk_1").attr("data-price"); // фактура потолка
        
        calk_2 = $(".calk_2").attr("data-price"); // цвет полотна
        
        square = $(".calk_3").val(); // площадь помещения
        square_price = $(".calk_3").attr("data-price"); 

        corner = $(".calk_4").val(); // углы
        corner_price = $(".calk_4").attr("data-price"); 
     
        if(calk_1 == "0"){
            square_price = 1390;
        } else if (calk_1 == "1"){
            square_price = 1600;
        } else if (calk_1 == "2") {
            square_price = 2250;
        } else
            square_price = "0";

        result += parseInt((square_price) * parseInt(square) + parseInt(corner_price) * parseInt(corner));
        
        if(calk_2 == "0"){
            calk_2_result = 0;
        } else{
            calk_2_result = calk_2;
        }
        
        result += square * calk_2_result;
        
        $(".result_calculator span").text(result); // ВСЕГО
    }
    
    $(".r_calc").click(function(){
        $(this).next().stop(true, true).slideToggle("10");
    })
    
    $(".options_calc div").click(function(){
        var data_text = $(this).text();
        var data_price = $(this).attr("data-price");
        $(this).parent().prev().text(data_text).attr("data-price", data_price);
        $(this).parent().stop(true, true).slideToggle("10");
        $(this).parent().children(".active").removeClass("active");
        $(this).addClass("active");

        ResultCalculator();
    })
    
    $( ".too, .tooo" ).keyup(function(){
        ResultCalculator();
    });
    
    $(document).mouseup(function (e) {
        var container = $(".options_calc");
        if (container.has(e.target).length === 0){
            $(".options_calc").fadeOut("slow");
        }
    })
    
    $(".go_mail").click(function(){
        
        calk_1 = $(".calk_1").attr("data-price");
        calk_1_text = $(".calk_1").text();
        calk_2 = $(".calk_2").attr("data-price");
        calk_2_text = $(".calk_2").text();
        calk_3 = $(".calk_3").val();
   
        result_calculator = $(".result_calculator span").text();
        
        email = $(".calk_email").val();
        
        $.ajax({
            type:'post',
            url:'action.php',
            data:{'email':email,'calk_1':calk_1,'calk_1_text':calk_1_text,
            'calk_2':calk_2,'calk_2_text':calk_2_text,'calk_3':calk_3,
            'result_calculator':result_calculator},
            response:'text',
            success:function(data){
                $(".answer").text(data).fadeIn("slow");
                $(".answer").delay(1000).fadeOut("slow");
            }
        })
    })
})

const ACTION = {
    PLUS: 'plus',
    MINUS: 'minus'
}

const totalPriceWrapper = document.getElementById('total-price')

const init = () => {

    let totalCost = 0;

    totalPriceWrapper.textContent = totalCost;
    totalPriceWrapper.dataset.value = totalCost;

};

const calculateSeparateItem = (basketItem, action) => {
    const input = basketItem.querySelector('.input')

    switch (action) {
        case ACTION.PLUS:
            input.value++;
            totalPriceWrapper.textContent = Number(totalPriceWrapper.dataset.value) + Number(input.dataset.price)
            totalPriceWrapper.dataset.value = Number(totalPriceWrapper.dataset.value) + Number(input.dataset.price)
            break;
        case ACTION.MINUS:
            input.value--;
            totalPriceWrapper.textContent = Number(totalPriceWrapper.dataset.value) - Number(input.dataset.price)
            totalPriceWrapper.dataset.value = Number(totalPriceWrapper.dataset.value) - Number(input.dataset.price)
            break
    }
}

document.getElementById('basket').addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-minus')) {
        calculateSeparateItem(
            event.target.closest('.basket__item'),
            ACTION.MINUS)
    }

    if (event.target.classList.contains('btn-plus')) {
        calculateSeparateItem(
            event.target.closest('.basket__item'),
            ACTION.PLUS)
    }
});

init();