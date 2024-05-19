import { AreaChart, BarChart2, CloudRain, FileUp, FolderUp, Home, PieChart, Server, ShieldAlert, User, Users, VenetianMask, icons } from "lucide-react";

const RootNavList = [
    { title:'Home', path:'/', icons:<Home /> },
    { title:'User', path:'/users', icons:<User /> },
    { title:'Server', path:'/server',icons:<Server /> },
    { title:'Attacker', path:'/attacker',icons:<VenetianMask /> },
];
const UserNavList = [
    { title:'File Upload', path:'/dashboard/users/fileupload', icons:<FolderUp /> },
    { title:'Upload Files', path:'/dashboard/users/uploadchart', icons:<AreaChart /> },
    { title:'Cloud Space', path:'/dashboard/users/cloudspacechart', icons:<PieChart /> },
    { title:'Cloud Storage', path:'/dashboard/users/cloudstoragechart', icons:<CloudRain /> },
];
const ServerNavList = [
    { title:'Upload Files', path:'/dashboard/server/uploadedfiles', icons:<FileUp /> },
    { title:'Data Owner', path:'/dashboard/server/dataowners' , icons:<Users /> },
    { title:'Attack List', path:'/dashboard/server/attacks', icons:<ShieldAlert /> },
    { title:'File Status Graph', path:'/dashboard/server/graph', icons:<BarChart2 />},
];

export {
    ServerNavList,
    UserNavList,
    RootNavList,
}