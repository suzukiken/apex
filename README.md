# CDK Project to create Route 53 A Record

## Purpose

Sometimes Apex A record will be required for creating subdomains.
Otherwise you might get error message like this.
`Custom domain is not a valid subdomain: Was not able to resolve the root domain, please ensure an A record exists for the root domain.`

To solve this problem, this CDK project place the record.

## Resources to be created

* Route 53 A Record
  * apex domain
    * Target: S3 Bucket
* S3 Bucket

(diagram)[https://diagram.figmentresearch.com/apex]

## Commands

* `npm install`
* `cdk deploy`
* `npm run diagram`

## Parameters

These parameters are defined in cdk.json 

* domain name
