pragma solidity >=0.4.21 <8.10.0;
pragma experimental ABIEncoderV2;

contract Aadhar {
    address public admin;


    struct Organization {
        uint type_org;
        string pic_hash;
        string name;
        string contactNo;
        bool isVerified;
        string location;
        string about;
        string phyAdd;
        string email;
        string org_website_link;
    }



    struct Person_data {
        address org_address;
        uint org_type;
        string org_name;
        string doc_title;
        string Description;
        string Hash; //hash of the doc
        uint256 timeStamp; //use "now" to store current time
    }


    struct Person {
        string name;
        string pic_hash;
        string AadharNo;
        string dob;
        string contactNo;
        string Gender;
        string phyAddress;
        address ethAddress;
        Person_data[] Edu_data;
        Person_data[] Crime_data;
        Person_data[] Med_data;
    }

    mapping(address => Person) public address_person_map;
    mapping(address => Organization) public address_edu_map;
    mapping(address => Organization) public address_crime_map;
    mapping(address => Organization) public address_med_map;

    mapping(address => bool) public exists_address_person_map;
    mapping(address => bool) public exists_address_edu_map;
    mapping(address => bool) public exists_address_crime_map;
    mapping(address => bool) public exists_address_med_map;

    mapping(address => bool) public verified_address_edu_map;
    mapping(address => bool) public verified_address_crime_map;
    mapping(address => bool) public verified_address_med_map;

    mapping(address => address) public person_to_edu_org;
    mapping(address => address) public person_to_crime_org;
    mapping(address => address) public person_to_med_org;

    constructor() public {
        admin = msg.sender;
    }

    function registerOrg (
        address org_address,
        string memory name,
        uint type_org,
        string memory pic_hash,
        string memory contactNo,
        string memory location,
        string memory about,
        string memory phyAdd,
        string memory email,
        string memory website_link) public {
            Organization memory org = Organization(type_org, pic_hash, name, contactNo, false, location, about, phyAdd, email, website_link);
            if(type_org == 0){
                // org = address_edu_map[org_address];
                address_edu_map[org_address] = org;
                exists_address_edu_map[org_address] = true;
                // registerEduOrg(org_address, name, pic_hash, contactNo, location, about, phyAdd, email, website_link);
            } else if (type_org == 1){
                // org = address_crime_map[org_address];
                address_crime_map[org_address] = org;
                exists_address_crime_map[org_address] = true;
                // registerCrimeOrg(org_address, name, pic_hash, contactNo, location, about, phyAdd, email, website_link);
            } else if(type_org==2){
                // org = address_med_map[org_address];
                address_med_map[org_address] = org;
                exists_address_med_map[org_address] = true;
                // registerMedOrg(org_address, name, pic_hash, contactNo, location, about, phyAdd, email, website_link);
            }else{
                revert("Wrong Type!");
            }

            // org.name = name;
            // org.type_org = 0;
            // org.contactNo = contactNo;
            // org.location = location;
            // org.about = about;
            // org.phyAdd = phyAdd;
            // org.email = email;
            // org.pic_hash = pic_hash;
            // org.org_website_link = website_link;

        }

    // function registerEduOrg(
    //     address org_address,
    //     string memory name,
    //     string memory pic_hash,
    //     string memory contactNo,
    //     string memory location,
    //     string memory about,
    //     string memory phyAdd,
    //     string memory email,
    //     string memory website_link
    // ) public {
    //     // Check if exists
    //     Organization storage org = address_edu_map[org_address];
    //     org.name = name;
    //     org.type_org = 0;
    //     org.contactNo = contactNo;
    //     org.location = location;
    //     org.about = about;
    //     org.phyAdd = phyAdd;
    //     org.email = email;
    //     org.pic_hash = pic_hash;
    //     org.org_website_link = website_link;

    //     exists_address_edu_map[org_address] = true;
    // }

    // function registerCrimeOrg(
    //     address org_address,
    //     string memory name,
    //     string memory pic_hash,
    //     string memory contactNo,
    //     string memory location,
    //     string memory about,
    //     string memory phyAdd,
    //     string memory email,
    //     string memory website_link
    // ) public {
    //     Organization storage org = address_crime_map[org_address];
    //     org.name = name;
    //     org.type_org = 1;
    //     org.contactNo = contactNo;
    //     org.location = location;
    //     org.about = about;
    //     org.phyAdd = phyAdd;
    //     org.email = email;
    //     org.pic_hash = pic_hash;
    //     org.org_website_link = website_link;

    //     exists_address_crime_map[org_address] = true;
    // }

    // function registerMedOrg(
    //     address org_address,
    //     string memory name,
    //     string memory pic_hash,
    //     string memory contactNo,
    //     string memory location,
    //     string memory about,
    //     string memory phyAdd,
    //     string memory email,
    //     string memory website_link
    // ) public {
    //     // Check if exists
    //     Organization storage org = address_med_map[org_address];
    //     org.name = name;
    //     org.type_org = 2;
    //     org.contactNo = contactNo;
    //     org.location = location;
    //     org.about = about;
    //     org.phyAdd = phyAdd;
    //     org.email = email;
    //     org.pic_hash = pic_hash;
    //     org.org_website_link = website_link;

    //     exists_address_med_map[org_address] = true;
    // }

    function registerPerson(
        address person_address,
        string memory pic_hash,
        string memory name,
        string memory Gender,
        string memory AadharNo,
        string memory phyAddress,
        string memory dob,
        string memory contactNo
    ) public {
        Person storage per = address_person_map[person_address];
        per.name = name;
        per.pic_hash = pic_hash;
        per.Gender = Gender;
        per.AadharNo = AadharNo;
        per.dob = dob;
        per.ethAddress = person_address;
        per.phyAddress = phyAddress;
        per.contactNo = contactNo;

        exists_address_person_map[person_address] = true;
    }

    function getPerson(address person_address) public view returns (Person memory){
        return address_person_map[person_address];
    }

    function getOrg(address org_address) public view returns (Organization memory){
        if(exists_address_edu_map[org_address]){ return address_edu_map[org_address]; }
        else if(exists_address_med_map[org_address]){ return address_med_map[org_address]; }
        else if(exists_address_crime_map[org_address]){ return address_crime_map[org_address]; }
        return address_edu_map[org_address];
    }

    function getDocsList(address user_address, uint org_type) public view returns (Person_data [] memory){
        Person memory user = address_person_map[user_address];
        if(org_type == 0){ return user.Edu_data; }
        else if(org_type == 1){ return user.Crime_data; }
        else{ return user.Med_data; }
    }

    function checkRole(address my_address) public view returns (uint256) {
        if(my_address == admin) {return 1;}
        if(exists_address_person_map[my_address] == true){ return 2; }
        if(exists_address_edu_map[my_address] == true){ return 3; }
        if(exists_address_med_map[my_address] == true){ return 4; }
        if(exists_address_crime_map[my_address] == true){ return 5; }
        return 0;
    }

    function addPersonDoc(
        address person_address,
        uint org_type,
        address org_address,
        string memory doc_hash,
        string memory doc_title,
        string memory Description
    ) public {
        require(
            verified_address_edu_map[org_address] ||
                verified_address_crime_map[org_address] ||
                verified_address_med_map[org_address],
            "ORGANISATION NOT VERIFIED!"
        );
        require(
            exists_address_person_map[person_address],
            "PERSON DOES NOT EXIST!"
        );
        Person storage per = address_person_map[person_address];
        string memory org_name = "";
        if(org_type == 0){ org_name = address_edu_map[org_address].name; }
        else if(org_type == 1){ org_name = address_crime_map[org_address].name; }
        else if(org_type == 2){ org_name = address_med_map[org_address].name; }
        Person_data memory tempData = Person_data(
                org_address,
                org_type,
                org_name,
                doc_title,
                Description,
                doc_hash,
                block.timestamp
        );
        if(org_type == 0){ per.Edu_data.push(tempData); }
        else if(org_type == 1){ per.Crime_data.push(tempData); }
        else if(org_type == 2){ per.Med_data.push(tempData); }
        // if(org_type == 0){ 
        //     org_name = address_edu_map[org_address].name;
        //     Person_data memory tempData = Person_data(
        //         org_address,
        //         org_type,
        //         org_name,
        //         Description,
        //         doc_hash,
        //         block.timestamp
        // );
        // per.Edu_data.push(tempData);
        //      }
        // else if(org_type == 1){
        //     org_name = address_crime_map[org_address].name;
        //     Person_data memory tempData = Person_data(
        //         org_address,
        //         org_type,
        //         org_name,
        //         Description,
        //         doc_hash,
        //         block.timestamp
        // );
        // per.Crime_data.push(tempData);
        //     }
        // else if(org_type == 2){ 
        //     org_name = address_med_map[org_address].name;
        //     Person_data memory tempData = Person_data(
        //         org_address,
        //         org_type,
        //         org_name,
        //         Description,
        //         doc_hash,
        //         block.timestamp
        // );
        // per.Med_data.push(tempData);
        //      }
    }

    modifier onlyAdmin() {
        require(msg.sender == admin);
        _;
    }

    function verifyOrg(address org_address) public onlyAdmin {
        if(exists_address_edu_map[org_address]){ verifyEduOrg(org_address); }
        else if(exists_address_med_map[org_address]){ verifyMedOrg(org_address); }
        else if(exists_address_crime_map[org_address]){ verifyCrimeOrg(org_address); }
        else{
            revert("No org found");
        }
    }

    function unverifyOrg(address org_address) public onlyAdmin {
        if(exists_address_edu_map[org_address]){ unverifyEduOrg(org_address); }
        else if(exists_address_med_map[org_address]){ unverifyMedOrg(org_address); }
        else if(exists_address_crime_map[org_address]){ unverifyCrimeOrg(org_address); }
        else{
            revert("No org found");
        }
    }

    function verifyEduOrg(address org_address) public onlyAdmin {
        require(
            exists_address_edu_map[org_address],
            "ORGANISATION DOES NOT EXIST!"
        );
        Organization storage temporg = address_edu_map[org_address];
        temporg.isVerified = true;
        verified_address_edu_map[org_address] = true;
    }

    function unverifyEduOrg(address org_address) public onlyAdmin {
        require(
            exists_address_edu_map[org_address],
            "ORGANISATION DOES NOT EXIST!"
        );
        Organization storage temporg = address_edu_map[org_address];
        temporg.isVerified = false;
        verified_address_edu_map[org_address] = false;
    }

    function verifyCrimeOrg(address org_address) public onlyAdmin {
        require(
            exists_address_crime_map[org_address],
            "ORGANISATION DOES NOT EXIST!"
        );
        Organization storage temporg = address_crime_map[org_address];
        temporg.isVerified = true;
        verified_address_crime_map[org_address] = true;
    }

    function unverifyCrimeOrg(address org_address) public onlyAdmin {
        require(
            exists_address_crime_map[org_address],
            "ORGANISATION DOES NOT EXIST!"
        );
        Organization storage temporg = address_crime_map[org_address];
        temporg.isVerified = false;
        verified_address_crime_map[org_address] = false;
    }

    function verifyMedOrg(address org_address) public onlyAdmin {
        require(
            exists_address_med_map[org_address],
            "ORGANISATION DOES NOT EXIST!"
        );
        Organization storage temporg = address_med_map[org_address];
        temporg.isVerified = true;
        verified_address_med_map[org_address] = true;
    }

    function unverifyMedOrg(address org_address) public onlyAdmin {
        require(
            exists_address_med_map[org_address],
            "ORGANISATION DOES NOT EXIST!"
        );
        Organization storage temporg = address_med_map[org_address];
        temporg.isVerified = true;
        verified_address_med_map[org_address] = true;
    }

    // function addEduOrgDocs(address org_address, string memory hash)
    //     public
    //     onlyAdmin
    // {
    //     require(
    //         verified_address_edu_map[org_address],
    //         "ORGANISATION  IS NOT VERIFIED!!"
    //     );
    //     Organization storage temporg = address_edu_map[org_address];
    //     temporg.Docs.push(hash);
    // }

    // function addCrimeOrgDocs(address org_address, string memory hash)
    //     public
    //     onlyAdmin
    // {
    //     require(
    //         verified_address_crime_map[org_address],
    //         "ORGANISATION  IS NOT VERIFIED!!"
    //     );
    //     Organization storage temporg = address_crime_map[org_address];
    //     temporg.Docs.push(hash);
    // }

    // function addMedOrgDocs(address org_address, string memory hash)
    //     public
    //     onlyAdmin
    // {
    //     require(
    //         verified_address_med_map[org_address],
    //         "ORGANISATION  IS NOT VERIFIED!!"
    //     );
    //     Organization storage temporg = address_med_map[org_address];
    //     temporg.Docs.push(hash);
    // }
}