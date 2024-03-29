(function() {
  var fs = require("fs");
  var path = require("path");
  var Handlebars = require("handlebars");
  var handlebarsHelpers = require("./template/HandlebarHelpers");
  var phantomjs = require('phantomjs-prebuilt');

  var base = require("./resume.json");

  var compiled = __dirname + '/compiled';
  if (!fs.existsSync(compiled)) {
    fs.mkdirSync(compiled, 0744);
  }
  handlebarsHelpers.register();

  function render(resume, filename) {
    var css = fs.readFileSync(__dirname + "/template/style.css", "utf-8");
    var tpl = fs.readFileSync(__dirname + "/template/resume.hbs", "utf-8");

    //generates HTML
    fs.writeFile(compiled + "/" + filename + ".html", Handlebars.compile(tpl)({
      css: css,
      resume: resume,
    }), {
      flag: 'w'
    }, function(err, written, buffer) {});

  }

  render(base, 'JosephHaaga.en');
}());
