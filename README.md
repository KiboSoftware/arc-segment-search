# Shipping Extensibility Test (Arc JS)

A basic implementation of Shipping Extensibility using API Extensions (Arc JS).

Shipping Extensibility test application that provides sample rates and labels without any external 3rd-party dependencies.
Rates and labels are fake and should only be used for basic validation purposes.

__THIS CODE IS NOT FOR PRODUCTION USE.__ It is only useful for internal testing and debugging of Shipping Extensibility carriers.

## Requirements

- Kibo Developer Account
- Kibo API Extension Application
- Node.js

Note: This README assumes you are familiar with Kibo's API Extension framework.
If you are not, please review the API Extensions guide found [here](https://docs.kibocommerce.com/help/getting-started-with-api-extensions).

## Getting Started

1. Configure your Shipping Extensibility application in your Kibo Developer Center. See the [Configuration section](#configuration) for the standard payload used for this application.

2. Fork or Clone this repo.

3. Configure your mozu.config.json file. If updating an existing application use one of the pre-defined config files.

    ```bash
    # Copy the template file
    cp mozu.config-template.json ./mozu.config.json
    # Or copy a pre-defined config file
    cp mozu.config-QA.json ./mozu.config.json
    ```

4. Install Dependencies

    ```bash
    npm install
    ```

6. Deploy the application

    ```bash
    grunt
    ```

## Deployments

Application is deployed to environments as ShippingExtensibilityTest. It can be found under the standard Mozu Integrations account along with other integration apps.

See the pre-defined config files for exact developer account IDs and application IDs.

## Configuration

The Shipping Adapter payload for configuring the application is below:

```
{
    "definition": {
        "description": "Test Extensible Carrier",
        "logoUrl": "https://i.imgur.com/fqEM1gh.png",
        "configFields": [
            {
                "name": "apiusername",
                "dataType": "string",
                "required": true,
                "localizations": [
                    {
                        "localeCode": "en-US",
                        "label": "API Username",
                        "description": "API username"
                    }
                ]
            },
            {
                "name": "apipassword",
                "dataType": "password",
                "required": true,
                "localizations": [
                    {
                        "localeCode": "en-US",
                        "label": "API Password",
                        "description": "API password"
                    }
                ]
            },
            {
                "name": "testinteger",
                "dataType": "Integer",
                "required": false,
                "localizations": [
                    {
                        "localeCode": "en-US",
                        "label": "Test Integer",
                        "description": "Test integer"
                    }
                ]
            },
            {
                "name": "likecake",
                "dataType": "Boolean",
                "required": true,
                "localizations": [
                    {
                        "localeCode": "en-US",
                        "label": "Do you like cake?",
                        "description": "The cake is not a lie?"
                    }
                ]
            }
        ]
    },
    "serviceTypes": [
        {
            "serviceTypeCodeSuffix": "Standard",
            "deliveryDuration": "Standard",
            "localizations": [
                {
                    "localeCode": "en-US",
                    "name": "Ship Ext Test Standard"
                }
            ]
        },
        {
            "serviceTypeCodeSuffix": "3_Day",
            "deliveryDuration": "ThreeDay",
            "localizations": [
                {
                    "localeCode": "en-US",
                    "name": "Ship Ext Test 3 Day"
                }
            ]
        },
        {
            "serviceTypeCodeSuffix": "2_Day",
            "deliveryDuration": "TwoDay",
            "localizations": [
                {
                    "localeCode": "en-US",
                    "name": "Ship Ext Test 2 Day"
                }
            ]
        },
        {
            "serviceTypeCodeSuffix": "1_Day",
            "deliveryDuration": "OneDay",
            "localizations": [
                {
                    "localeCode": "en-US",
                    "name": "Ship Ext Test 1 Day"
                }
            ]
        }
    ]
}
```

## Behavior

This application is designed to return mostly-hardcoded responses to all Shipping Extensibility methods. It does not integrate with any external service.

Supported methods:
* rates
* labels
* manifest
* manifest-url
* cancel-labels

### Rates

When requesting rates a hardcoded list of rates will be returned for each supported shipping method regardless of the shipping addresses. The rates will not change.

### Labels

When requesting labels this application will return a hardcoded tracking number and image for both shipment and return labels (one for each). The requested addresses do not matter and the same image is always returned.
# arc-segment-search
