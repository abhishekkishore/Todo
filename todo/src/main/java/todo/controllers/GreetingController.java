package todo.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@ResponseBody
public class GreetingController {

    @RequestMapping("/greeting")
    public Greeting greeting(@RequestParam(value="name", required=false, defaultValue="World") String name, Model model) {
//        model.addAttribute("name", name);
        Greeting greeting = new Greeting();
        greeting.setName("Abhishek");
        greeting.setGreetingText("Hello");
        return greeting;
    }
    
    private class Greeting {
    	public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public String getGreetingText() {
			return greetingText;
		}
		public void setGreetingText(String greetingText) {
			this.greetingText = greetingText;
		}
		private String name;
    	private String greetingText;
    }

}
