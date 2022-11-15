# frozen_string_literal: true

$LOAD_PATH.push File.expand_path('lib', __dir__)

# Maintain your gem's version:
require 'kanaui/version'

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = 'kanaui'
  s.version     = Kanaui::VERSION
  s.authors     = 'Kill Bill core team'
  s.email       = 'killbilling-users@googlegroups.com'
  s.homepage    = 'http://www.killbill.io'
  s.summary     = 'Kill Bill Analytics UI mountable engine'
  s.description = 'Rails UI plugin for the Analytics plugin.'
  s.license     = 'MIT'

  s.files = Dir['{app,config,db,lib}/**/*'] + %w[MIT-LICENSE Rakefile README.md]
  s.test_files = Dir['test/**/*']

  s.add_dependency 'd3_rails'
  s.add_dependency 'jquery-datatables-rails'
  s.add_dependency 'jquery-rails'
  s.add_dependency 'js-routes'
  s.add_dependency 'rails', '~> 6.0.6'
  # See https://github.com/seyhunak/twitter-bootstrap-rails/issues/897
  s.add_dependency 'bootstrap-datepicker-rails'
  s.add_dependency 'font-awesome-rails'
  s.add_dependency 'killbill-client'
  s.add_dependency 'sass-rails'
  s.add_dependency 'spinjs-rails'
  s.add_dependency 'bootstrap'
  s.add_dependency 'bootstrap-sass'

  s.add_development_dependency 'gem-release'
  s.add_development_dependency 'json'
  s.add_development_dependency 'listen'
  s.add_development_dependency 'rake'
  s.add_development_dependency 'rubocop', '~> 0.88.0' if RUBY_VERSION >= '2.4'
  s.add_development_dependency 'simplecov'
end
