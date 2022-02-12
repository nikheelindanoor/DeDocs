pragma solidity >=0.4.21 <8.10.0;

contract Aadhar {
    address public admin;

    struct Org_Education {
        string name;
        string org_id;
        bool isVerified;
        string location;
        string about;
        string physical_address;
        string email;
        string[] Docs; //Array of hashes
    }

    struct Org_Crime {
        string name;
        string org_id;
        bool isVerified;
        string location;
        string about;
        string physical_address;
        string email;
        string[] Docs; //Array of hashes
    }

    struct Edu_data {
        address org_address;
        string org_name;
        string Description;
        string Hash; //hash of the doc
        uint256 timeStamp; //use "now" to store current time
    }

    struct Crime_data {
        address org_address;
        string org_name;
        string Description;
        string Hash; //hash of the doc
        uint256 timeStamp; //use "now" to store current time
    }

    struct Person {
        string name;
        string AadharNo;
        string Gender;
    }

    mapping(address => Person) public address_person_map;
    mapping(address => Org_Education) public address_edu_map;
    mapping(address => Org_Crime) public address_crime_map;

    mapping(address => bool) public exists_address_person_map;
    mapping(address => bool) public exists_address_edu_map;
    mapping(address => bool) public exists_address_crime_map;

    mapping(address => bool) public verified_address_edu_map;
    mapping(address => bool) public verified_address_crime_map;

    mapping(address => address) public person_to_edu_org;
    mapping(address => address) public person_to_crime_org;

    mapping(address => Edu_data[]) public person_edu_doc_mapping;
    mapping(address => Crime_data[]) public person_crime_doc_mapping;

    constructor() public {
        admin = msg.sender;
    }
}
