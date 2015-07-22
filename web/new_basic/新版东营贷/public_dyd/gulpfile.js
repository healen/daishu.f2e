/*引入插件*/
var gulp=require("gulp"),
    less=require("gulp-less"),
    clean=require("gulp-clean");
/*task任务编译LESS*/
gulp.task("less",["clean"],function(){
    gulp.src("./Mosa/less/*.less")
        .pipe(less({compress: false}))
        .on("error",function(e){console.log(e)})
        .pipe(gulp.dest("./public/styles/"));
});
/*清理CSS*/
gulp.task("clean", function(){
    gulp.src("./public/styles/*.css", { read:true })
        .pipe(clean());
});

/*监考任务*/
gulp.task('watch', function () {
   gulp.watch('./Mosa/**/*.less',function(){
     gulp.run('less','clean','watch');
   });
});

/*自动跑任务*/
gulp.task('default',function(){
    gulp.run('less','clean','watch');
})



