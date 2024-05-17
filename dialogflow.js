const dialogflow = require('@google-cloud/dialogflow');
const { WebhookClient, Suggestion, Card } = require('dialogflow-fulfillment');
const express = require("express")
const cors = require("cors");

const app = express();
app.use(express.json())
app.use(cors());

const PORT = 8080;

app.post("/webhook", async (req, res) => {
    var id = (res.req.body.session).substr(43);
    console.log(id)
    const agent = new WebhookClient({ request: req, response: res });

    function Welcome(agent) {
        console.log(`intent  =>  hi`);
        agent.add("I am pizza assistant. how may i assist you today.")
        agent.add(new Suggestion('order'))
    }

    function mybtn(agent) {
        console.log(`intent  =>  hi`);
        agent.add("I am btn.")
        agent.add(new Suggestion('order'))
        agent.add(new Card({

            title:"this is title",
            imageUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiMNuHpC-YssS0yK3PikIV0sEIcnHMYV4HkFndq4gumg&s"
        }

        ))
    }
    function Fallback(agent) {
        const { number , date , email} = agent.parameters;
       agent.add("Fallback server")
    }

    function order_pizza(agent) {
        const { pizza_name, pizza_number, pizza_size} = agent.parameters;
       agent.add(`Ok, your ${pizza_number},${pizza_name} pizza with ${pizza_size} size is ready in few minutes.`)
    }
    let intentMap = new Map();
    intentMap.set('Default Fallback Intent', Fallback);
    intentMap.set('Default Welcome Intent', Welcome);
    intentMap.set('btn', mybtn);
    intentMap.set('order', order_pizza);


    
    agent.handleRequest(intentMap);
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});