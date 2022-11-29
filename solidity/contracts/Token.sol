//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Token is Ownable {
    mapping (address => uint256) private _balances;
    mapping (address => mapping (address => uint256)) private _allowed;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    event Approval(address indexed _owner, address indexed _spender, uint256 _value);

    string public symbol;
    string public name;
    uint8 public decimals;
    uint256 private _totalSupply;

    constructor() {
        symbol = "K1X";
        name = "k1x1k";
        decimals = 18;
        _totalSupply = 333*10**18;
        _balances[0x8c00b23082b11FcDc331Dc3F99948741659F962d] = 333*10**18;
        emit Transfer(address(0), 0x8c00b23082b11FcDc331Dc3F99948741659F962d, 333*10**18);
    }

    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address _owner) public view returns (uint256 balance){
        return _balances[_owner];
    }

    function allowance(address _owner, address _spender) public view returns (uint256 remaining){
        return _allowed[_owner][_spender];
    }

    function transfer(address _to, uint256 _value) public returns (bool success){
        require(_to != address(0), "transfer to zero address");
        require(_value <= _balances[msg.sender], "not enough balance");
        require(_value >= 0, "value must be greater than 0");
        require(_value <= 20*10**18, "value must be less than or equal to 20");

        _balances[msg.sender] = _balances[msg.sender] - _value;
        _balances[_to] = _balances[_to] + _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success){
        require(_to != address(0), "transfer to zero address");
        require(_value <= _balances[_from], "not enough balance");
        require(_value <= _allowed[_from][msg.sender], "not enough allowance");
        require(_value >= 0, "value must be greater than 0");

        _balances[_from] = _balances[_from] - _value;
        _allowed[_from][msg.sender] = _allowed[_from][msg.sender] - _value;
        _balances[_to] = _balances[_to] + _value;
        emit Transfer(_from, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool success){
        require(_value > 0, "value must be greater than 0");

        _allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function mint(uint256 _value, address _to) public onlyOwner{
        require(_value != 0, "value must be greater than 0");
        require(_to != address(0), "mint to zero address");

        _totalSupply = _totalSupply + _value;
        _balances[_to] = _balances[_to] + _value;
        emit Transfer(address(0), _to, _value);
    }
}
