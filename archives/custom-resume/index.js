var fs = require("fs");
var path = require("path");
var Handlebars = require("handlebars");

// these are refactored HandleBars helpers that I extracted into a different file
var handlebarsHelpers = require("./template/HandlebarHelpers");
handlebarsHelpers.register();

var base = require("./resume.json");

var compiled = __dirname + '/compiled';
if (!fs.existsSync(compiled)) {
  fs.mkdirSync(compiled, 0744);
}

function render(resume, filename) {
  // reading the file synchronously
    var css = fs.readFileSync(__dirname + "/template/style.css", "utf-8");
    var tpl = fs.readFileSync(__dirname + "/template/resume.hbs", "utf-8");

    //Write to specified filenamem, the generated HTML from Handlebars.compile
    fs.writeFile(compiled + "/" + filename + ".html", Handlebars.compile(tpl)({
      css: css,
      resume: resume
    }), {
      flag: 'w'
    });
}

render(base, 'JosephHaaga.en');

(function () {
  // this is a self executing function.
}());
