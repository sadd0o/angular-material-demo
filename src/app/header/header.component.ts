import { Component, OnInit } from '@angular/core';


interface Agent {
  value: string;
  viewValue: string;
}

interface Country {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

  agents: Agent[] = [
    {value: 'john', viewValue: 'John Doe'},
    {value: 'john1', viewValue: 'John 1'},
    {value: 'john2', viewValue: 'John 2'}
  ];

  country: Country[] = [
    {value: 'pakistan', viewValue: 'Pakistan'},
    {value: 'us', viewValue: 'United States'},
    {value: 'australia', viewValue: 'Australia'}
  ];

}
