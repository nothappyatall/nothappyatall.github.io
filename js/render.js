//imagefile = "https://fortunedotcom.files.wordpress.com/2016/09/rtx2ojuq.jpg?w=900&quality=85";
imagefile = "";
apologytext = "";
memotext= "";
fontcolor="#e1e1e1";

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
      downloadCanvas(this, 'preview_canvas', 'img.png');
    });
    $("#download2").click(function(){
      downloadCanvas(this, 'memo_canvas', 'imgmemo.png');
    });
}
function changecolor(e){
  console.log($(this).val());
  fontcolor=$(this).val();
  render();
}

function downloadCanvas(link, canvasId, filename) {
    link.href = document.getElementById(canvasId).toDataURL();
    link.download = filename;
}


function renderFooter(ctx){
    var qrcode = "https://nothappyatall.github.io/img/qrcode.jpeg";
    var img = new Image;
    img.src = qrcode;
    img.onload = function() {

      var left= 2;
      var top = ctx.canvas.height-52;
      ctx.drawImage(img, left,top);

      var line1 = "你也想向罗老师道歉？访问 nothappyatall.github.io"
      var line2 = "为什么要道歉？请扫描二维码看详情";
      ctx.font = '14px arial, sans-serif';
      var lineheight=14;
      ctx.fillStyle = fontcolor;
      ctx.fillText(line1, 56, ctx.canvas.height-30);
      ctx.fillText(line2, 56, ctx.canvas.height-12);
    };
}

function renderText(ctx){
  var textarr= apologytext.trim().split(/\n|\r/);
  ctx.font = '30px arial, sans-serif';
  var lineheight=34;

  var left= $("#maintextleft").val();;
  var top = ctx.canvas.height - $("#maintextbottom").val()-50;
     


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
      ctx.canvas.height = height;
      if(width < 640)
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
