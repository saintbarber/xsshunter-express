const { IncomingWebhook } = require('ms-teams-webhook');
const url = process.env.TEAMS_WEBHHOK_URI
const webhook = new IncomingWebhook(url);

async function send_teams_notification(xss_payload_fire_data){
    
    const date = new Date(xss_payload_fire_data.browser_timestamp);

    const card = {
        "@type": "MessageCard",
        "@context": "https://schema.org/extensions",
        "summary": "XSS Payload Fired",
        "themeColor": "d70048",
        "title": `XSS Payload Fired - ${xss_payload_fire_data.id}`,
        "potentialAction":[
            {
                "@type": "OpenUri",
                "name": "View Screenshot",
                "targets": [
                    {
                        "os": "default",
                        "uri": xss_payload_fire_data.screenshot_url
                    }
                ]
            }
        ],
        "sections": [{
            "text": date.getHours() + ":" + date.getMinutes() + " - "+ date.toDateString(),
            "facts": [
                {
                    "name": "URL",
                    "value": xss_payload_fire_data.url
                },
                {
                    "name": "IP Address",
                    "value": xss_payload_fire_data.ip_address
                },
                {
                    "name": "Cookies",
                    "value": xss_payload_fire_data.cookies ? xss_payload_fire_data.cookies : "null"
                },
                {
                    "name": "Origin",
                    "value": xss_payload_fire_data.origin ? xss_payload_fire_data.origin : "null"
                },
                {
                    "name": "User-Agent",
                    "value": xss_payload_fire_data.user_agent ? xss_payload_fire_data.user_agent : "null"
                },
                {
                    "name": "Referer",
                    "value": xss_payload_fire_data.referer ? xss_payload_fire_data.referer : "null"
                }
            ]
        }]
    }
    const message = JSON.stringify(card);
    webhook.send(message);
}

module.exports.send_teams_notification = send_teams_notification;