#!/usr/bin/env nu

let UUID = open metadata.json | get uuid
let SCHEMA = open metadata.json | get settings-schema
let TARGET = $"share/gnome-shell/extensions/($UUID)"

def bundle [input: string, output: string] {
    (esbuild
     --bundle $input
     --outfile=$"($output)"
     --format=esm
     --sourcemap=inline
     --external:gi://*
     --external:resource://*
     --external:gettext
    )
}

# build the extension
def "main build" [] {
    rm -rf ./dist
    mkdir ./dist/schemas

    bundle ./src/extension/index ./dist/extension.js
    bundle ./src/prefs/index ./dist/prefs.js

    cat ./src/schemas/gschema.xml
    | str replace "@id@" $SCHEMA
    | str replace "@path@" $"/($SCHEMA | split row "." | str join "/")/"
    | save $"./dist/schemas/($SCHEMA).gschema.xml"

    glib-compile-schemas ./dist/schemas

    cp ./metadata.json ./dist
    sass ./src/extension/index.scss ./dist/stylesheet.css
}

# build and install the extension
def "main install" [
    --prefix: string # default (~/.local)
] {
    let pre = $prefix | default $"($env.HOME)/.local" | path expand
    let target = $"($pre)/($TARGET)"
    rm -rf $target
    main build
    mkdir $target
    cp -r ./dist/* $target
}

# build and test in nested shell
def "main test" [] {
    main install
    dbus-run-session -- gnome-shell --nested --wayland
}

# generate .pot files
def "main gettext" [] {
    mkdir po
    xgettext **/*.ts **/*.tsx --from-code=UTF-8 $"--output=po/($UUID).pot" -L JavaScript
}

def main [] {
    nu $env.CURRENT_FILE --help
}
