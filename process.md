# Deployment

    - Signup on AWS
    - Launch instance
    - open bash terminal
    - chmod 400 <secret>.pem
    - ssh -i "<secret>.pem" ubuntu@<public-dns>.com -> opens the machine server
    - Install Node version <version using in application>
    - Git clone repo-name
    - Frontend
        - npm install  -> dependencies install
        - npm run build
        - sudo apt update
        - sudo apt install nginx
        - sudo systemctl start nginx
        - sudo systemctl enable nginx
        - sudo scp -r dist/* /var/www/html/ -> Copy code from dist(build files) to /var/www/html/
        - Enable port :80 of your instance
    - Backend
        - update the backend script - start
        - install BE dependencies and npm start
        - updated .env field
          - vim .bash_profile [stackOverflow help](https://stackoverflow.com/questions/28643573/how-to-set-an-environment-variable-in-amazon-ec2)
        - allow BE port on EC2 security configuration to run BE
          - select the instance
          - open security tab
          - open security group and add rule -> custom TCP -> BE port number-> all all IP -> save
        - allowed ec2 instance public IP on mongodb server under network access
        - npm intsall pm2 -g
        - pm2 start npm --name "devTinder-backend" -- start
        - pm2 logs
        - pm2 list, pm2 flush <name> , pm2 stop <name>, pm2 delete <name>

    - nginx config
        - sudo nano /etc/nginx/sites-available/default - to open the nginx config in root
        - update below things
          - server_name <ec2 instance public ipv4 address without HTTP>;

          - location /api/ {
              proxy_pass http://localhost:<Port_number>/;  # Pass the request to the Node.js app
              proxy_http_version 1.1;
              proxy_set_header Upgrade $http_upgrade;
              proxy_set_header Connection 'upgrade';
              proxy_set_header Host $host;
              proxy_cache_bypass $http_upgrade;
          }
        - After making changes
        - ctrl+o (to save file) -> Press Enter -> ctrl+ x to exit from config file
        - restart nginx - sudo systemctl restart nginx
        - Modify the BASEURL in frontend project to "/api"

    # Addding a custom Domain name

        - purchased domain name from godaddy
        - signup on cloudflare & add a new domain name
        - change the nameservers on godaddy and point it to cloudflare
        - wait for sometime till your nameservers are updated ~15 minutes
        - DNS record: A devtinder.in 43.204.96.49
        - Enable SSL for website
    
    # Sending Emails via SES
    
        - Create a IAM user
        - Give Access to AmazonSESFullAccess
        - Amazon SES: Create an Identity
        - Verify your domain name
        - Verify an email address identity
        - Install AWS SDK - v3 
        - Code Example https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/javascriptv3/example_code/ses#code-examples
        - Setup SesClient
        - Access Credentials should be created in IAm under SecurityCredentials Tab
        - Add the credentials to the env file
        - Write code for SESClient
        - Write code for Sending email address
        - Make the email dynamic by passing more params to the run function

