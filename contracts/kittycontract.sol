
pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

import "./IERC721.sol";
import "./IERC721Receiver.sol";
import "./ownable.sol";

contract Kittycontract is IERC721, Ownable{
    //using SafeMath for uint256;

    uint16 public constant CREATION_LIMIT_GEN0 = 100;
    string public constant name = "Kitties";
    string public constant symbol = "Ktty";

    bytes4 internal constant ERC721_RECEIVED = bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"));

    bytes4 private constant _INTERFACE_ID_ERC721 = 0x80ac58cd;
    bytes4 private constant _INTERFACE_ID_ERC165 = 0x01ffc9a7;

    struct Kitty {
        uint256 genes;
        uint64 birthTime;
        uint32 mumId;
        uint32 dadId;
        uint16 generation;
    }

    Kitty[] Kitties;

    mapping(address => uint256) private _ownershipTokenCount;
    mapping(uint256 => address) private _tokenOwnership;
    mapping(uint256 => address) private _tokenIndexToApproved;
    mapping(address => mapping (address => bool)) private _operatorApproved;
    uint16 _gen0Counter;

    event Birth(address indexed owner, uint256 indexed tokenId, uint256 mumId, uint256 dadId, uint256 genes);

    modifier onlyOperator (uint256 tokenId) {
        require(_checkOperator(msg.sender, tokenId));
        _;
    }

    function supportsInterface (bytes4 _interfaceId) external view returns (bool) {
        return _interfaceId == _INTERFACE_ID_ERC721 || _interfaceId == _INTERFACE_ID_ERC165;
    }

    function breed (uint256 _mumId, uint256 _dadId) external returns (uint256) {
        require(_checkOperator(msg.sender,_mumId));
        require(_checkOperator(msg.sender,_dadId));
        Kitty storage mum = Kitties[_mumId];
        Kitty storage dad = Kitties[_dadId];
        uint256 newGenes = _mixGenes(mum.genes, dad.genes);
        uint256 generation = (mum.generation > dad.generation ? mum.generation : dad.generation) + 1;
        return _createKitty(
            _mumId,
            _dadId,
            generation,
            newGenes,
            _tokenOwnership[_mumId]
        );
    }

    function createKittyGen0 (uint256 _genes) public onlyOwner returns (uint256) {
        require(_gen0Counter < CREATION_LIMIT_GEN0, "Gen 0 limit reached");
        _gen0Counter++;
        return _createKitty(
            0,
            0,
            0,
            _genes,
            msg.sender
        );
    }

    function _createKitty (
        uint256 _mumId,
        uint256 _dadId,
        uint256 _generation,
        uint256 _genes,
        address _owner
    ) private returns (uint256)
    {
        Kitty memory _kitty = Kitty({
            genes: _genes,
            birthTime: uint64(now),
            mumId: uint32(_mumId),
            dadId: uint32(_dadId),
            generation: uint16(_generation)
        });
        uint256 newTokenId = Kitties.push(_kitty) - 1;
        
        emit Birth(_owner, newTokenId, _mumId, _dadId, _genes);
        _transfer(address(0), _owner, newTokenId);
        return newTokenId;
    }

    function getKitty (uint256 tokenId) external view returns (Kitty memory) {
        return Kitties[tokenId];
    }

    /**
     * @dev Returns the number of tokens in ``owner``'s account.
     */
    function balanceOf(address owner) external view returns (uint256 balance)
    {
        return _ownershipTokenCount[owner];
    }

    /*
     * @dev Returns the total number of tokens in circulation.
     */
    function totalSupply() external view returns (uint256 total)
    {
        return Kitties.length;
    }

    /**
     * @dev Returns the owner of the `tokenId` token.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function ownerOf(uint256 tokenId) external view returns (address owner)
    {
        return _tokenOwnership[tokenId];
    }

    function approve(address _approved, uint256 _tokenId) external onlyOperator(_tokenId)
    {
        _tokenIndexToApproved[_tokenId] = _approved;
        emit Approval(msg.sender, _approved, _tokenId);
    }

    function setApprovalForAll(address _operator, bool _approved) external {
        _operatorApproved[msg.sender][_operator] = _approved;
        emit ApprovalForAll(msg.sender, _operator, _approved);
    }

    function getApproved(uint256 _tokenId) external view returns (address) {
        return _tokenIndexToApproved[_tokenId];
    }

    function isApprovedForAll(address _owner, address _operator) external view returns (bool) {
        return _operatorApproved[_owner][_operator];
    }

    /* @dev Transfers `tokenId` token from `msg.sender` to `to`.
     *
     *
     * Requirements:
     *
     * - `to` cannot be the zero address.
     * - `to` can not be the contract address.
     * - `tokenId` token must be owned by `msg.sender`.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address to, uint256 tokenId) external onlyOperator(tokenId)
    {
        require(to != address(0), "IERC721: transfer to the zero address.");
        require(to != address(this), "Token cannot be sent to this contract.");
        require(_tokenOwnership[tokenId] != address(0), "Token does not exist");

        address from = msg.sender;
        _transfer(from, to, tokenId);
    }

    function transferFrom(address _from, address _to, uint256 _tokenId) external {
        _transferFrom(_from, _to, _tokenId);
    }

    function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes calldata data) external {
        _transferFrom(_from, _to, _tokenId);
        require( _checkERC721Support(_from, _to, _tokenId, data) );
    }

    function safeTransferFrom(address _from, address _to, uint256 _tokenId) external {
        _transferFrom(_from, _to, _tokenId);
        require( _checkERC721Support(_from, _to, _tokenId, "") );
    }

    function _transfer (address from, address to, uint256 tokenId) private
    {
        // update ownership
        _tokenOwnership[tokenId] = to;
        // update ownership count
        if (from != address(0)) {
            _ownershipTokenCount[from]--;//_ownershipTokenCount[from].sub(1);
            delete _tokenIndexToApproved[tokenId];
        }
        _ownershipTokenCount[to]++;//_ownershipTokenCount[to].add(1);

        emit Transfer(from, to, tokenId);
    }

    function _transferFrom(address _from, address _to, uint256 _tokenId) internal onlyOperator(_tokenId) {
        require(_isTokenValid(_tokenId));
        require(_to != address(0));
        require(_isOwner(_from, _tokenId));
        _transfer(_from, _to, _tokenId);
    }

    function _checkOperator (address _operator, uint256 _tokenId) private view returns (bool) {
        return _tokenOwnership[_tokenId] == _operator ||
            _tokenIndexToApproved[_tokenId] == _operator ||
            _operatorApproved[_tokenOwnership[_tokenId]][_operator];
    }

    function _isTokenValid (uint256 _tokenId) private view returns (bool) {
        return _tokenId < Kitties.length;
    }

    function _isOwner (address _from, uint256 _tokenId) private view returns (bool) {
        return _tokenOwnership[_tokenId] == _from;
    }

    function _checkERC721Support (address _from, address _to, uint256 _tokenId, bytes memory data) internal returns (bool) {
        if ( !_isContract(_to) ) {
            return true;
        }
        bytes4 returnData = IERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, data);
        return returnData == ERC721_RECEIVED;
    }

    function _isContract (address _to) internal returns (bool) {
        uint32 size;
        assembly{
            size := extcodesize(_to)
        }
        return size > 0;
    }

    function _mixGenes (uint256 _dadGenes, uint256 _mumGenes) internal returns (uint256) {
        uint256 div = 100000000;
        uint256 firstHalf = _dadGenes / div;
        uint256 secondHalf = _mumGenes % div;
        return firstHalf*div + secondHalf;
    }
}