make.ts

The MakeManifest is a class

that lets us register a regex, a dep fn that returns a list of dependencies and an async build fn (that takes dependencies, and result of regex match - match groups etc.)

the MakeManifest can call compile which creates a MakeState

MakeState has a fn called build("target name")

build will iterate through all handlers until it finds a handler that matches. It will generate dependencies list and call build() on each of them.

we will then call the build fn if the target is stale vs. the dependencies (mtime)
