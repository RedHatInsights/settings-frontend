# Settings Frontend

Global settings frontend for cloud.redhat.com

## Usage

This project uses [Data Driven Forms](https://data-driven-forms.org/).

### Prerequisites

1. Your application must be active in the [Cloud Services Config source of truth](https://github.com/RedHatInsights/cloud-services-config) with the `api` field.
2. Your API must have a `GET` and `POST` endpoint at `/api/{appName}/{version}/settings`.

### GET and POST endpoints

#### GET

Your `GET` endpoint will return an array in the format provided by [Data Driven Forms](https://data-driven-forms.org/).

Example:

``` json
[
    {
        "fields": [
            {
                "component": "checkbox",
                "label": "Checkbox",
                "name": "checkbox",
                "isRequired": true,
                "validate": [{
                    "type": "required-validator"
                }]
            },
            {
                "name": "conditionalTextField",
                "label": "When checkbox is checked!",
                "component": "text-field",
                "condition": {
                    "when": "checkbox", // name of controlled field
                    "is": true, // condition
                }
            }
        ]
    }
]
```

There is a [live editor](https://data-driven-forms.org/live-editor) where you can test the schema before implementing it.

#### POST

The `POST` endpoint will receive the submitted values

## Dev Instructions

* `npm install`
* Run both `npm run start` & `SPANDX_CONFIG=path/to/settings-frontend/profiles/local-frontend.js sh path/to/insights-proxy/scripts/run.sh`
