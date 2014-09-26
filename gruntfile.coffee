module.exports = (grunt) =>

  grunt.initConfig
      pkg: grunt.file.readJSON('package.json')
      #clean:
      #  deleteReleaseFolder: {
      #      src: 'dst/js/*'
      #  }
      browserify:  # タスク名. $ grunt browserify で実行できる
        app:
          files: "web/js/app.js" : [ "src/js/application.js" ]
          options:
            ignore: [ "src/js/vendor.js" ]
            extensions: [".js", ".html"]
            transform: [ "node-underscorify" ]
            external: [
              "jquery"
              "underscore"
              "backbone"
              "backbone.marionette"
              "moment"
            ]
        vendor:
          files: "web/js/vendor.js" : [ "src/js/vendor.js" ]
          options:
            alias: [
              "jquery:jquery"
              "underscore:underscore"
              "backbone:backbone"
              "backbone.marionette:backbone.marionette"
              "moment:moment"
            ]

        #        dist: 
        #          src: 'src/js/app.js'   # エントリーポイントとなるファイル
        #          dest: 'dst/js/build.js'     # 出力するファイル名
        #        options:
        #          transform: ['node-underscorify']
      sass:                              
        dist: 
          options:                        
            bundleExec: true
          files: 
            "web/css/app.css": "src/css/application.scss"
      esteWatch:
          options:
              dirs: [
                  "src/css/**",
                  "src/js/**"
              ]
          sass: (path) ->
              ['sass','browserify']
          js: (path) ->
            if /vendor\.js$/.test(path)
              return ["makeAll"];
            ['sass','browserify']
  grunt.loadNpmTasks 'grunt-contrib-sass'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-browserify'
  grunt.loadNpmTasks 'grunt-este-watch'
  grunt.registerTask 'make', ['sass','browserify:app']
  grunt.registerTask 'makeAll', ['sass','browserify']
  grunt.registerTask 'default', ['makeAll',  'esteWatch']
