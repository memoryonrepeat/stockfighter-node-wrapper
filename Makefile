# Test case directory

# To run:
# make test (Test the REST api)
# make auth (Test the authorization service)

TESTCASES = test/**.js

# Bored of testing ? Try this:
# NODE_ENV=test mocha $(TESTCASES) --reporter nyan

test:
	NODE_ENV=test mocha $(TESTCASES) --reporter spec

# The "make" program always try to find a target file with
# the indicated name to build. This is not the case as we just want
# it to run the script without compiling anything.
# .PHONY helps excluding the test folder from being built by make.
.PHONY: test