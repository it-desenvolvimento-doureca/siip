package pt.example.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "RP_OF_OP_LIN")
public class RP_OF_OP_LIN {

	private Integer ID_OP_LIN;
	private Integer ID_OP_CAB;
	private String REF_NUM;
	private String REF_DES;
	private String REF_IND;
	private String REF_VAR1;
	private String REF_VAR2;
	private Integer REF_INDNUMENR;
	private Integer QUANT_OF;
	private Integer QUANT_BOAS_TOTAL;
	private Integer QUANT_DEF_TOTAL;
	private Float PERC_OBJETIV;
	private Float PERC_DEF;

	@Id
	@Column(name = "ID_OP_LIN")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Integer getID_OP_LIN() {
		return ID_OP_LIN;
	}

	@Column(name = "ID_OP_CAB")
	public Integer getID_OP_CAB() {
		return ID_OP_CAB;
	}

	@Column(name = "REF_NUM")
	public String getREF_NUM() {
		return REF_NUM;
	}

	@Column(name = "REF_DES")
	public String getREF_DES() {
		return REF_DES;
	}

	@Column(name = "REF_IND")
	public String getREF_IND() {
		return REF_IND;
	}

	@Column(name = "REF_VAR1")
	public String getREF_VAR1() {
		return REF_VAR1;
	}

	@Column(name = "REF_VAR2")
	public String getREF_VAR2() {
		return REF_VAR2;
	}

	@Column(name = "REF_INDNUMENR")
	public Integer getREF_INDNUMENR() {
		return REF_INDNUMENR;
	}

	@Column(name = "QUANT_OF")
	public Integer getQUANT_OF() {
		return QUANT_OF;
	}

	@Column(name = "QUANT_BOAS_TOTAL")
	public Integer getQUANT_BOAS_TOTAL() {
		return QUANT_BOAS_TOTAL;
	}

	@Column(name = "QUANT_DEF_TOTAL")
	public Integer getQUANT_DEF_TOTAL() {
		return QUANT_DEF_TOTAL;
	}

	@Column(name = "PERC_OBJETIV")
	public Float getPERC_OBJETIV() {
		return PERC_OBJETIV;
	}

	@Column(name = "PERC_DEF")
	public Float getPERC_DEF() {
		return PERC_DEF;
	}

	public void setID_OP_LIN(Integer iD_OP_LIN) {
		ID_OP_LIN = iD_OP_LIN;
	}

	public void setID_OP_CAB(Integer iD_OP_CAB) {
		ID_OP_CAB = iD_OP_CAB;
	}

	public void setREF_NUM(String rEF_NUM) {
		REF_NUM = rEF_NUM;
	}

	public void setREF_DES(String rEF_DES) {
		REF_DES = rEF_DES;
	}

	public void setREF_IND(String rEF_IND) {
		REF_IND = rEF_IND;
	}

	public void setREF_VAR1(String rEF_VAR1) {
		REF_VAR1 = rEF_VAR1;
	}

	public void setREF_VAR2(String rEF_VAR2) {
		REF_VAR2 = rEF_VAR2;
	}

	public void setREF_INDNUMENR(Integer rEF_INDNUMENR) {
		REF_INDNUMENR = rEF_INDNUMENR;
	}

	public void setQUANT_OF(Integer qUANT_OF) {
		QUANT_OF = qUANT_OF;
	}

	public void setQUANT_BOAS_TOTAL(Integer qUANT_BOAS_TOTAL) {
		QUANT_BOAS_TOTAL = qUANT_BOAS_TOTAL;
	}

	public void setQUANT_DEF_TOTAL(Integer qUANT_DEF_TOTAL) {
		QUANT_DEF_TOTAL = qUANT_DEF_TOTAL;
	}
	
	public void setPERC_OBJETIV(Float pERC_OBJETIV) {
		PERC_OBJETIV = pERC_OBJETIV;
	}

	public void setPERC_DEF(Float pERC_DEF) {
		PERC_DEF = pERC_DEF;
	}

}
