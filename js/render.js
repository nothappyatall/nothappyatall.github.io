imagefile = "";
apologytext = "";
memotext= "";
fontcolor="#e1e1e1";

footerheight=100;

function init(){
  $('select[name="colorpicker"]').simplecolorpicker('selectColor', '#7bd148');
  apologytext=$("#apologytext").val();
  memotext=$("#memotext").val();
  fontcolor="#e1e1e1";
}
function initbind(){

    $("#inputimage").on('change', setbackgroundimg);
    $("#apologytext").keyup(setText);
    $("#maintextbottom").keyup(setTextPos);
    $("#maintextleft").keyup(setTextPos);

    $("#memotext").keyup(setMemoText);
    $(".colorpicker").on('change', changecolor);
    $("#download1").click(function(){
      downloadCanvas(this, 'preview_canvas', 'img.jpg');
    });
    $("#download2").click(function(){
      downloadCanvas(this, 'memo_canvas', 'imgmemo.jpg');
    });
}
function changecolor(e){
  console.log($(this).val());
  fontcolor=$(this).val();
  render();
}

function downloadCanvas(link, canvasId, filename) {
    link.href = document.getElementById(canvasId).toDataURL("image/jpeg");
    link.download = filename;
}


function renderFooter(ctx){
    var qrcode = "https://nothappyatall.github.io/img/qrcode.jpeg";
    var img = new Image;

    ctx.fillStyle = "#FCFCFC";
    ctx.fillRect(0, ctx.canvas.height, ctx.canvas.width, 80);

    img.src = qrcode;
    img.onload = function() {

      var left= 10;
      var top = ctx.canvas.height-footerheight+10;
      ctx.drawImage(img, left,top);

      var line1 = "你也想向罗老师道歉？访问 nothappyatall.github.io"
      var line2 = "扫描二维码可以阅读Pin作者钟颖的原始文章。";
      ctx.font = '18px arial, sans-serif';
      var lineheight=27;
      ctx.fillStyle = "#000000";
      ctx.fillText(line1, 110, ctx.canvas.height-60);
      ctx.fillText(line2, 110, ctx.canvas.height-30);
    };
}

function renderText(ctx){
  var textarr= apologytext.trim().split(/\n|\r/);
  ctx.font = '40px arial, sans-serif';
  var lineheight=54;

  var left= $("#maintextleft").val();;
  var top = ctx.canvas.height - $("#maintextbottom").val()-footerheight;
     


  for (var i in textarr){
    var text = textarr[i];
    ctx.fillStyle = fontcolor;
    var p= top-(textarr.length-i-1)*lineheight;
    ctx.fillText(text, left, p);
  }
}

function render(){
  var canvas = document.getElementById('preview_canvas');
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if(imagefile != ""){
    var img = new Image;
    if (typeof imagefile == "string" && imagefile.indexOf("http")==0)
      img.src = imagefile;
    else 
      img.src = URL.createObjectURL(imagefile);
    img.onload = function() {
      var height = img.naturalHeight;
      var width= img.naturalWidth;
      ctx.canvas.height = height + footerheight;
      if(width < 700)
        ctx.canvas.width = width;
      ctx.drawImage(img, 0,0);
      renderText(ctx);
      renderFooter(ctx);
    }
  }else{
      renderText(ctx);
  }
}

function rendermemo(){
  var canvas = document.getElementById('memo_canvas');
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#e1e5e8";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  var textarr= memotext.split(/\n|\r/);
  ctx.font = '18px arial, sans-serif';
  var lineheight=20;
  for (var i in textarr){
    var text = textarr[i];
    ctx.fillStyle = "#000000";
    ctx.fillText(text, 20, 40+i*lineheight+4);
  }

}

function setbackgroundimg(e){
 imagefile = e.target.files[0];
  $("#upload-file-info").html($(this).val());
  render();
}

function setTextPos(e){
  render();

}

function setText(e){
  apologytext = $(this).val();
  render();
}

function setMemoText(e){
  memotext=$("#memotext").val();
  rendermemo();
}
