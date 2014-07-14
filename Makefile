REPORTER = dot
test:
    @NODE_ENV=test ./node_modules/.bin/mocha -b --reporter $(REPORTER)

app-cov:
    ./node_modules/.bin/jscoverage lib lib-cov

test-cov: app-cov
    @AUTH_COV=1 $(MAKE) test REPORTER=html-cov > docs/coverage.html

.PHONY: test
